import React from 'react'
import Image from './Image.js'

export default function Tracked({name}) {
    return (
        <div 
        onClick={() => {
            if (name.type == "country") {
                window.location.href = "/country/" + name.name
            } else {
                window.location.href = "/user/" + name.id
            }
        }}
        className="md:w-72 w-72 h-12 text-center justify-start px-2 border-2 m-1 py-2 hover:bg-gray-400 cursor-pointer rounded flex">
            <div className="self-center outline-inner">

                <Image
                    height={30}
                    width={30}
                    link={name.url}
                />
            </div>
            <div className="px-2 self-center">
                {name.name}
            </div>
            <div className="self-center">
                {Math.floor(name.pp) + "pp"}
            </div>
        </div>
    )
}
