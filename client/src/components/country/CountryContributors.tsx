import { Link } from "react-router-dom";
import { Contributor } from "../../../../models/Country.model";


export const CountryContributors = ({ contributors }: { contributors: Contributor[] }) => {

    return (
        <div className="flex flex-col gap-1">
            {contributors.sort((a, b) => b.pp - a.pp).map((contributor, index) => (
                <div key={index} className="flex items-center dark:text-white gap-2">
                    {contributor.name === "Bonus pp" ? <span>Bonus pp</span> : (
                        <Link className="hover:underline" to={"/redirect/" + contributor.name}>{contributor.name}</Link>
                    )}
                    <span>{contributor.pp.toFixed(2)}</span>
                </div>
            ))}
        </div>
    )
}