import { Country } from "../../../../models/Country.model"

export const CountryDetails = ({ details }: { details: Country }) => {

    return (
        <div className="flex items-center w-full">
            {details.name === "Global" ? (
                <img src="https://www.flagpictures.com/media/united-nations-flag.jpg" alt="flag" className="h-24 md:h-52 md:w-auto border border-black" />
            ) : (
                <img src={`https://flagpictures.imgix.net/${details.abbreviation.toLowerCase()}.png`} alt="flag" className="h-24 md:h-52 md:w-auto border border-black" />
            )}
            <div className="flex flex-col ml-2 md:ml-4 min-w-0 text-sm md:text-lg">
                <span className="md:text-xl font-medium">{details.name}</span>
                <span>{parseFloat(details.pp).toFixed(0)}pp</span>
                <span>Acc {(details.acc*100).toFixed(2)}%</span>
                <span>Range {parseFloat(details.range).toFixed(0)}pp</span>
                <span>Farm {details.farm}%</span>
            </div>
        </div>
    )
}