import Image from 'next/image';
import Card from './Card';

interface Player {
  name: string;
  pp: number;
  id: number;
}

interface PlayersProps {
  onNavigate: () => void;
  players?: Player[]
}

const players: Player[] = [
  { 
    name: 'Zoomer',
    pp: 15000,
    id: 6600930,
  },
  { 
    name: 'nzbasic',
    pp: 7000,
    id: 9008211,
  },
]

const Players = ({ onNavigate }: PlayersProps) => {
  return (
    <>
      {players.map(({ id, name, pp }) => (
        <Card 
          key={id}
          href={`/app/tracking/user/${id}`}
          name={name} 
          value={pp + " pp"} 
          onClick={onNavigate}           
        >
          <Image src={`https://a.ppy.sh/${id}`} alt="dp" width="50" height="50" className="rounded" />
        </Card>
      ))}
    </>
  )
};

export default Players;
