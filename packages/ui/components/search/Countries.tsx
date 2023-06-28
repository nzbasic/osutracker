import ReactCountryFlag from "react-country-flag";
import Card from "./Card";

interface Country {
    name: string;
    abbreviation: string;
    pp: number;
}

interface CountriesProps {
    onNavigate: () => void;
    countries?: Country[];
}

const countries: Country[] = [
    {
        name: "New Zealand",
        abbreviation: "NZ",
        pp: 15000,
    },
    {
        name: "United States",
        abbreviation: "US",
        pp: 23000,
    },
];

const Countries = ({ onNavigate }: CountriesProps) => {
    return (
        <>
            {countries.map(({ abbreviation, name, pp }) => (
                <Card
                    key={abbreviation}
                    name={name}
                    value={pp + " pp"}
                    href={`/app/tracking/country/${name}`}
                    onClick={onNavigate}
                >
                    <div className="hidden rounded-md md:block">
                        <ReactCountryFlag
                            countryCode={abbreviation}
                            svg
                            className="rounded-md"
                            style={{ width: "4em", height: "3em" }}
                        />
                    </div>
                </Card>
            ))}
        </>
    );
};

export default Countries;
