import Mod from "./Mod";

interface ModsProps {
  mods: string[];
}

export default function Mods({ mods }: ModsProps) {
  return (
    <div className="flex gap-1">
      {mods.map(mod => (
        <Mod key={mod} mod={mod} />
      ))}
    </div>
  );
};
