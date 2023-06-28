import cn from "classnames";
import { get } from 'api-client';

type Props = {
    user: Awaited<ReturnType<typeof get<"v2/user/:id">>>;
    lastWeek: Awaited<ReturnType<typeof get<"v2/user/:id/stats">>>[0];
};

const stats: {
    label: string;
    key: keyof Props["user"];
    pastKey?: keyof Props["lastWeek"];
}[] = [
    {
        label: "Rank",
        key: "rank",
        pastKey: "rank",
    },
    {
        label: "PP",
        key: "pp",
        pastKey: "pp",
    },
    {
        label: "Accuracy",
        key: "acc",
        pastKey: "acc",
    },
    {
        label: "Playcount",
        key: "plays",
        pastKey: "plays",
    },
    {
        label: "Level",
        key: "level",
    },
    {
        label: "Farm",
        key: "farm",
        pastKey: "farm",
    },
    {
        label: "Range",
        key: "range",
        pastKey: "range",
    },
];

function Stat({
    label,
    value,
    pastValue,
}: {
    label: string;
    value: any;
    pastValue?: any;
}) {
    const difference = pastValue - value;

    const format = Intl.NumberFormat("en-US", { signDisplay: "always" }).format;
    // const arrow = difference > 0 ? <HiArrowTrendingUp /> : <HiArrowTrendingDown />;

    return (
        <div className="flex flex-col items-start">
            <h4 className="text-lg font-medium md:text-xl">{label}</h4>
            <div className="flex items-center gap-1">
                <h6>{value}</h6>
                {pastValue && (
                    <div
                        className={cn("flex items-center", {
                            "text-red-500": difference < 0,
                            "text-green-600": difference > 0,
                        })}
                    >
                        <span>{format(difference)}</span>
                        {/* {arrow} */}
                    </div>
                )}
            </div>
        </div>
    );
}

function StatsSummary({ user, lastWeek }: Props) {
    return (
        <div className="flex flex-wrap gap-6 gap-y-1 md:gap-4">
            {stats.map((stat) => (
                <Stat
                    key={stat.key}
                    label={stat.label}
                    value={user[stat.key]}
                    pastValue={stat.pastKey ? lastWeek[stat.pastKey] : undefined}
                />
            ))}
        </div>
    );
}

export default StatsSummary;
