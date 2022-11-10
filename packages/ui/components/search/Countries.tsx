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
    <>
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
    </>
  )
};

export default Countries;
