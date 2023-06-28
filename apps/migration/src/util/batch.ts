import { AnyBulkWriteOperation } from 'mongodb';
import { Model, Document, FilterQuery } from 'mongoose';

export async function batchModelUpdate<T>(
  model: Model<T>,
  batchSize: number,
  callbacks: {
    onItem: (
      item: T,
    ) =>
      | Promise<void>
      | void
      | Promise<AnyBulkWriteOperation>
      | AnyBulkWriteOperation;
    onBatchStart?: (count: number, remaining: number) => Promise<void> | void;
    onBatchEnd?: (count: number, remaining: number) => Promise<void> | void;
  },
  query: FilterQuery<T> = {},
  skip = false,
) {
  const count = await model.count(query);
  console.log(`batchModelUpdate: ${count} ${model.name} to update`);
  const batches = Math.ceil(count / batchSize);

  let remaining = count;

  for (let i = 0; i < batches; i++) {
    const batch = await model
      .find(query)
      .limit(batchSize)
      .skip(skip ? i * batchSize : 0);

    if (callbacks.onBatchStart) {
      await callbacks.onBatchStart(batch.length, remaining);
    }

    const ops: AnyBulkWriteOperation[] = [];

    for (const item of batch) {
      const op = await callbacks.onItem(item);
      if (op) {
        ops.push(op);
      }
    }

    remaining -= batch.length;

    if (ops.length) {
      await model.collection.bulkWrite(ops);
    }

    if (callbacks.onBatchEnd) {
      await callbacks.onBatchEnd(batch.length, remaining);
    }
  }
}

export function batchModelMigrate<T extends Document>({
  model,
  batchSize,
  migrationFunc,
  migrationVersion,
  query = {
    $or: [
      { migrationVersion: null },
      { migrationVersion: { $lt: migrationVersion } },
    ],
  },
}: {
  model: Model<T>;
  batchSize: number;
  migrationFunc: (item: T) => Promise<void>;
  migrationVersion: number;
  query?: FilterQuery<T>;
}) {
  return batchModelUpdate(
    model,
    batchSize,
    {
      onItem: async (item) => {
        await migrationFunc(item);
        return {
          updateOne: {
            filter: { _id: item._id },
            update: {
              $set: {
                migrationVersion,
                migrationDate: new Date(),
              },
            },
          },
        };
      },
      onBatchEnd: (count, remaining) => {
        console.log(
          `migrated ${count} ${model.modelName} to v${migrationVersion}, ${remaining} remaining`,
        );
      },
    },
    query,
  );
}
