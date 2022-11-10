import Link from 'next/link'
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import Card from './Card';

interface Country {
  name: string;
  abbreviation: string;
  pp: number;
}

interface CountriesProps {
  countries: Country[]
}

const countries: Country[] = [
  { 
    name: 'New Zealand',
    abbreviation: 'NZ',
    pp: 15000,
  },
  { 
    name: 'United States',
    abbreviation: 'US',
    pp: 23000,
  },
]

const Countries = () => {
  return (
    <div>
      <div className="font-semibold p-4">Countries</div>
      <div className="flex flex-col px-4 gap-1">
        {countries.map(({ abbreviation, name, pp }) => (
          <Card
            key={abbreviation}
            name={name}
            value={pp + " pp"}
            href={`/app/tracking/country/${name}`}
          >
            <ReactCountryFlag countryCode={abbreviation} svg className="rounded-md" style={{ width: '4em', height: '3em' }} />
          </Card>
        ))}
      </div>
    </div>
  )
};

export default Countries;
