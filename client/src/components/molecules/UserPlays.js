import React, { useState, useEffect } from "react";
import clonedeep from "lodash/cloneDeep";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css";

export default function UserPlays({ plays, currentTop, country }) {
  const [playsHistory, setPlaysHistory] = useState([
    { scores: currentTop, date: new Date().getTime() },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unique, setUnique] = useState(false);
  const [uniqueScores, setUniqueScores] = useState({ scores: [], date: 0 });

  const handleDateChange = (change) => {
    if (unique) {
      findUnique(currentIndex + change);
    }
    setCurrentIndex(currentIndex + change);
  };

  const findUnique = (index) => {
    let clone = clonedeep(playsHistory[index]);

    let uniqueCount = { scores: [], date: clone.date };

    for (const play of clone.scores) {
      let found = false;
      uniqueCount.scores.forEach((map) => {
        if (map.id === play.id) {
          found = true;
        }
      });
      if (!found) {
        uniqueCount.scores.push(play);
      }
    }
    setUniqueScores(uniqueCount);
  };

  const handleUnique = () => {
    if (unique) {
      setUnique(false);
    } else {
      setUnique(true);
      findUnique(currentIndex);
    }
  };

  useEffect(() => {
    if (plays.length !== 0) {
      playsHistory[0].date = plays[plays.length - 1].date;
      for (let i = plays.length - 1; i >= 0; i--) {
        let lastPlays = clonedeep(playsHistory[0].scores);
        let change = plays[i];
        let added = change.added;
        let removed = change.removed;

        let toRemove = [];

        lastPlays.forEach((play1) => {
          toRemove.push(
            added.findIndex(
              (play2) => play1.id === play2.id && play1.pp === play2.pp
            )
          );
        });

        toRemove.forEach((value, index) => {
          if (value > -1) {
            playsHistory[0].scores[index].added = true;
            lastPlays.splice(index, 1);
          }
        });

        removed.forEach((play) => {
          lastPlays.push(play);
        });

        lastPlays.sort(
          (play1, play2) => parseFloat(play2.pp) - parseFloat(play1.pp)
        );

        if (i !== 0) {
          playsHistory.unshift({ scores: lastPlays, date: plays[i - 1].date });
        } else {
          playsHistory.unshift({
            scores: lastPlays,
            date: plays[i].date - 86400,
          });
        }
      }

      playsHistory[playsHistory.length - 1].scores.sort(
        (a, b) => parseFloat(b.pp) - parseFloat(a.pp)
      );

      setPlaysHistory(playsHistory);
      setCurrentIndex(plays.length);
    }
  }, []);

  const Play = ({ data, index }) => (
    <ScrollAnimation
      animateIn="animate__slideInRight"
      duration={0.3}
      animateOnce
    >
      <div
        className={`${
          data.added
            ? "bg-green-500 text-main-one"
            : data.removed
            ? "bg-red-600 text-main-one"
            : "bg-main-one"
        } flex rounded-md shadow-md p-2 my-2 justify-between w-full text-xs md:text-sm lg:text-base`}
      >
        <div className="flex">
          <div className="w-6 md:w-10 self-center text-left">{"#" + index}</div>
          {country ? (
            <div className="self-center mr-2 hidden md:block lg:hidden md:w-20">
              {preventOverflow(data.player, 9)}
            </div>
          ) : (
            ""
          )}
          {country ? (
            <div className="self-center mr-2 hidden lg:block lg:w-32">
              {preventOverflow(data.player, 10)}
            </div>
          ) : (
            ""
          )}
          {country ? (
            <div className="self-center mr-4 md:hidden w-10">
              {preventOverflow(data.player, 7)}
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col">
            <a
              className="flex hover:text-main-four outline-none"
              href={"https://osu.ppy.sh/b/" + data.id}
              target="_blank"
              rel="noreferrer"
            >
              <div className="hidden md:block">
                {preventOverflow(artist(data.name), 20) + " -"}
              </div>
              <div className="hidden md:block lg:hidden">
                {preventOverflow(songName(data.name), 30)}
              </div>
              <div className="block md:hidden">
                {preventOverflow(songName(data.name), 15)}
              </div>
              <div className="hidden lg:block md:px-1">
                {preventOverflow(songName(data.name), 60)}
              </div>
            </a>
            <div>{preventOverflow(diffName(data.name), 20)}</div>
          </div>
        </div>

        <div className="flex self-center space-x-2">
          <div>{data.mods.length ? "+" + data.mods : ""}</div>
          <div>{(data.acc * 100).toFixed(2) + "%"}</div>
          <div>{Math.round(data.pp) + "pp"}</div>
        </div>
      </div>
    </ScrollAnimation>
  );

  return (
    <div className="w-full max-w-full flex flex-col">
      <div className="flex w-full justify-center items-center mb-4 text-sm md:text-base">
        <div className="p-2 bg-main-one rounded-md shadow-md flex">
          <div
            className={`${
              currentIndex > 0 ? "block" : "invisible"
            } mr-2 hover:text-main-four font-extrabold cursor-pointer`}
            onClick={() => handleDateChange(-1)}
          >
            ⟵
          </div>
          <div className="font-semibold">
            {new Date(playsHistory[currentIndex].date).toDateString()}
          </div>
          <div
            className={`${
              currentIndex < plays.length ? "block" : "invisible"
            } ml-2 hover:text-main-four font-extrabold cursor-pointer`}
            onClick={() => handleDateChange(1)}
          >
            ⟶
          </div>
        </div>
        <div>
          {country ? (
            <div
              className="bg-main-one text-xs md:text-base outline-inner shadow-md text-center ml-4 p-2 hover:bg-main-two cursor-pointer"
              onClick={handleUnique}
            >
              {unique ? "See All Scores" : "See Unique Maps"}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={unique ? "hidden" : "block"}>
        {playsHistory[currentIndex].scores.map((play, index) => (
          <Play key={index} data={play} index={index + 1} />
        ))}
      </div>
      <div className={unique ? "block" : "hidden"}>
        {uniqueScores.scores.map((play, index) => (
          <Play key={index} data={play} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

const preventOverflow = (string, number) =>
  string.length > number ? string.slice(0, number) + "..." : string;

const diffName = (name) => name.match(/(\[(.*?)\])/g).slice(-1)[0];

const artist = (name) => name.match(/.+( - )/g)[0].replace(/( - )/, "");

const songName = (name) =>
  name
    .replace(/(\[(.*?)\])/g, "")
    .replace(artist(name), "")
    .replace(/- /, "");
