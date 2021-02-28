import React from 'react'

export default function CountryContributors({contributors}) {

    contributors.sort((a,b) => parseInt(b.pp) - parseInt(a.pp))

    const Contributor = ({data}) => (

        <div className="flex justify-between w-full bg-main-one shadow-md rounded-md p-2">
            <div>{data.name}</div>
            <div>{Math.round(data.pp) + "pp"}</div>
        </div>

    )

    

    return (
        <div className="flex flex-col w-full mb-6">
            <div className="self-center mb-6 bg-main-one rounded-md shadow-md p-2 font-semibold">
                Total PP Contributors
            </div>
            <div className="w-full flex flex-col items-center space-y-2">
                {contributors.map(data => (<Contributor key={data.name} data={data} />))}
            </div>
        </div>
        
    )
}
