import classNames from "classnames";

const modColorMap = new Map<string, string>([
  ['dt', 'bg-purple-700'],
  ['ez', 'bg-green-600'],
  ['ht', 'bg-gray-600'],
  ['fl', 'bg-black'],
  ['hr', 'bg-red-600'],
  ['hd', 'bg-yellow-600'],
  ['nc', 'bg-purple-700'],
  ['nf', 'bg-blue-600'],
  ['pf', 'bg-orange-600'],
  ['ap', 'bg-blue-700'],
  ['so', 'bg-red-800'],
  ['sd', 'bg-orange-600']
])

const defaultColor = 'bg-blue-600'

interface ModProps {
  mod: string;
}

export default function Mod({ mod }: ModProps) {
  return (
    <div
      className={classNames(
        modColorMap.get(mod.toLowerCase()) ?? defaultColor,
        "h-7 w-7 text-white rounded text-sm flex items-center justify-center" 
      )}
    >
      {mod.toUpperCase()}
    </div>
  );
};
