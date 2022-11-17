import classNames from "classnames";

const colorMap = new Map<string, string>([
  ['xh', 'bg-purple-500 text-white'],
  ['x', 'bg-purple-500 text-yellow-300'],
  ['sh', 'bg-blue-400 text-white'],
  ['s', 'bg-blue-400 text-yellow-300'],
  ['a', 'bg-green-400 text-gray-800'],
  ['b', 'bg-blue-400 text-gray-800'],
  ['c', 'bg-purple-400 text-gray-800'],
  ['d', 'bg-red-500 text-gray-800'],
  ['f', 'bg-red-500 text-gray-800']
]);

interface RankProps {
  letter: string;
}

export const Rank = ({ letter }: RankProps) => {
  return (
    <div className={classNames(
      colorMap.get(letter.toLowerCase()) ?? 'bg-red-500 text-gray-800',
      'text-2xl font-semibold w-9 flex items-center justify-center rounded shrink-0'
    )}>
      {letter.toUpperCase().replace('X', 'SS').replace('H', '')}
    </div>
  );
};
