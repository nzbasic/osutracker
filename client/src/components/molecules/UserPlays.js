import React, { useState, useEffect } from "react";
import clonedeep from 'lodash/cloneDeep'

export default function UserPlays({ plays, currentTop }) {

  const [date, setDate] = useState(new Date().getTime())
  const [currentIndex, setCurrentIndex] = useState(plays.length)
  const [currentPlays, setCurrentPlays] = useState(currentTop)

  const goBack = () => {
    let nextPlays = plays[currentIndex-1]
    let added = nextPlays.added
    let removed = nextPlays.removed
    setCurrentIndex(currentIndex-1)
    setDate(nextPlays.date)
    
    let current = clonedeep(currentPlays)

    let toRemove = []
    current.forEach(play1 => {
      toRemove.push(added.findIndex(play2 => (play1.id == play2.id) && (play1.pp == play2.pp)))
    })

    toRemove.forEach((value, index) => {
      if (value > -1) current.splice(index, 1)
    })

    removed.forEach(play => {
      if(currentIndex-1 > 0) {
        play.added = true
      }
      current.push(play)
    })
    
    current.sort((play1, play2) => parseInt(play2.pp) - parseInt(play1.pp))
    setCurrentPlays(current)
  }

  const goForward = () => {

    let nextPlays = plays[currentIndex] 
    let added = nextPlays.added
    let removed = nextPlays.removed

    setCurrentIndex(currentIndex+1)

    if ((currentIndex+1) == plays.length) {
      setDate(new Date().getTime())
    } else {
      setDate(nextPlays.date)
    }

    let current = clonedeep(currentPlays)

    let toRemove = []
    current.forEach(play1 => {
      toRemove.push(removed.findIndex(play2 => (play1.id == play2.id) && (play1.pp == play2.pp)))
    })

    toRemove.forEach((value, index) => {
      if (value > -1) current.splice(index, 1)
    })

    added.forEach(play => {
      current.push(play)
    })

    current.sort((play1, play2) => parseInt(play2.pp) - parseInt(play1.pp))
    setCurrentPlays(current)
  }

  return (
    <div className="w-full max-w-full flex flex-col">

      <div className="self-center p-2 mb-4 bg-main-one rounded-md shadow-md flex">
        <div className={`${currentIndex > 0 ? "block" : "invisible"} mr-2 hover:text-main-four font-extrabold cursor-pointer`} onClick={goBack}>⟵</div>
        <div className="font-semibold">{new Date(date).toDateString()}</div>
        <div className={`${currentIndex == plays.length ? "invisible" : "block"} ml-2 hover:text-main-four font-extrabold cursor-pointer`} onClick={goForward}>⟶</div>
      </div>

      {currentPlays.map((play, index) => (
        <Play key={index} data={play} index={index + 1} />
      ))}
    </div>
  );
}

const Play = ({ data, index }) => (

  <div className={`bg-main-one flex rounded-md shadow-md p-2 my-2 justify-between w-full text-xs md:text-sm lg:text-base`}>
    <div className="flex flex-col">
      <a className="flex hover:text-main-four outline-none" href={"https://osu.ppy.sh/b/" + data.id} target="_blank" rel="noreferrer">
        <div className="hidden md:block">{artist(data.name) + " -"}</div>
        <div className="block lg:hidden">{preventOverflow(songName(data.name), 30)}</div>
        <div className="hidden lg:block md:px-1">{preventOverflow(songName(data.name), 60)}</div>
      </a>
      <div>{diffName(data.name)}</div>
    </div>
    <div className="flex self-center space-x-2">
      <div>{data.mods.length ? "+" + data.mods : ""}</div>
      <div>{(data.acc*100).toFixed(2) + "%"}</div>
      <div>{Math.round(data.pp) + "pp"}</div>
    </div>
  </div>



  
);

const preventOverflow = (string,number) =>
  string.length > number
    ? string.slice(0, number) + "..."
    : string;

const diffName = name => name.match(/(\[(.*?)\])/g).slice(-1)[0]

const artist = name => name.match(/.+( - )/g)[0].replace(/( - )/, "")

const songName = name => name.replace(/(\[(.*?)\])/g, "").replace(artist(name), "").replace(/- /, "")
