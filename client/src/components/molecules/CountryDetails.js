import React from 'react'
import Image from '../atoms/Image'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

export default function CountryDetails({details}) {
    return (
        <div className="bg-main-one rounded-md shadow-lg inline-flex flex-wrap m-4 p-4 font-semibold">
            <div className="flex">
                <div className="outline-inner">
                    <Image
                    link={
                        "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                        details.abbreviation +
                        ".svg"
                    }
                    height={200}
                    width={300}
                    />
                </div>
                <div className="flex flex-col justify-between m-2">
                    <div>{details.name}</div>
                    <div>{parseFloat(details.pp).toFixed(2) + "pp"}</div>
                    <div>{parseFloat(details.acc*100).toFixed(2) + "%"}</div>
                    <div className="flex">
                        <div>{"Range: " + details.range + "pp"}</div>
                        <Tooltip
                        title="Performance difference between highest and lowest play in top 100."
                        placement="bottom"
                        className="self-center"
                        TransitionComponent={Zoom}
                        >
                            <div className="pl-1 font-extrabold">(?)</div>
                        </Tooltip>
                    </div>
                    <div className="flex">
                        <div>{"Farm: " + details.farm + "%"}</div>
                        <Tooltip
                        title="Percentage of plays in top 100 where the beatmap was made by a common pp mapper (e.g. Sotarks)"
                        placement="bottom"
                        className="self-center"
                        TransitionComponent={Zoom}
                        >
                            <div className="pl-1 font-extrabold">(?)</div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}
