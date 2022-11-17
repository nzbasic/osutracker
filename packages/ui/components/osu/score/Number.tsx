import classNames from "classnames";

interface NumberProps {
  number: number;
}

export default function Number({ number }: NumberProps) {
  return (
    <div className={classNames(
      { 'bg-yellow-500': number === 1 },
      { 'bg-gray-500': number === 2 },
      { 'bg-orange-400': number === 3 },
      { 'bg-black': number > 3 },
      "w-9 h-8 text-white rounded text-lg flex items-center justify-center shrink-0"
    )}>
      {number}
    </div>
  );
};
