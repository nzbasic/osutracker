import React from 'react'
import Image from '../atoms/Image'

export default function Country(props) {
    return (
        <div className="flex flex-row px-1">
            <div className="outline-inner">
            <Image
                height={40}
                width={60}
                link={
                  "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                  props.abbreviation +
                  ".svg"
                }
              />
            </div>

            <div className="flex flex-col self-center px-2 text-main-four">
                {props.name}
            </div>
        </div>
    )
}
