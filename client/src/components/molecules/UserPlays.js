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
    // only execute if there are changes to apply
    if (plays.length > 0) {
      let newPlayHistory = [];
      newPlayHistory.push({ scores: currentTop, date: new Date().getTime() });

      // each play is a delta with added and removed scores compared to the last top plays.

      // start from the last plays update and loop to the first
      for (let i = plays.length - 1; i >= 0; i--) {
        let update = plays[i];
        let nextDate;
        let previousTop = clonedeep(newPlayHistory[0]);
        previousTop.scores.forEach((score) => {
          score.added = false;
        });

        if (i > 0) {
          nextDate = plays[i - 1].date;
        } else {
          nextDate = plays[i].date - 86401;
        }

        let playsToAdd = { scores: [], date: nextDate };

        // we are working backwards, so plays that were removed in each update are added to the playsToAdd

        update.removed.forEach((play) => {
          playsToAdd.scores.push(play);
        });

        // plays that were added need to be removed from the previous top plays
        // find the plays that DONT need to be removed and then add them to the current top

        // go through last top

        // find plays that werent in added
        previousTop.scores.forEach((previousPlay) => {
          let found = false;
          update.added.forEach((addedPlay) => {
            if (
              // can never be too sure..
              addedPlay.acc === previousPlay.acc &&
              addedPlay.id === previousPlay.id &&
              addedPlay.pp === previousPlay.pp
            ) {
              found = true;
            }
          });
          if (!found) {
            playsToAdd.scores.push(previousPlay);
          } else {
            //to do: fix this
            //previousPlay.added = true;
          }
        });

        // sort the plays
        playsToAdd.scores.sort((a, b) => parseFloat(b.pp) - parseFloat(a.pp));

        // finally, put the added plays in the first slot of the new array
        newPlayHistory.unshift(playsToAdd);
      }

      // roundabout method of showing the difference between two time periods there is probably a much smarter way of doing this but im lazy
      for (let i = 0; i < newPlayHistory.length - 1; i++) {
        // find plays that are in i+1 that arent in i

        let current = newPlayHistory[i];
        let next = newPlayHistory[i + 1];

        next.scores.forEach((scoreNew) => {
          let found = false;
          current.scores.forEach((scoreOld) => {
            if (
              scoreOld.acc === scoreNew.acc &&
              scoreOld.id === scoreNew.id &&
              scoreOld.pp === scoreNew.pp
            ) {
              found = true;
            }
          });
          if (!found) {
            scoreNew.added = true;
          }
        });
      }

      setPlaysHistory(newPlayHistory);
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
            : "bg-main-one dark:bg-gray-700 dark:text-white"
        } flex rounded-md shadow-md p-2 my-2 justify-between w-full text-xs md:text-sm lg:text-base`}
      >
        <div className="flex">
          <div className="w-6 md:w-10 self-center text-left">{"#" + index}</div>
          {country ? (
            <a
              className="self-center mr-2 hidden md:block lg:hidden md:w-20 hover:cursor-pointer hover:text-main-four"
              href={"/redirect/" + data.player}
            >
              {preventOverflow(data.player, 9)}
            </a>
          ) : (
            ""
          )}
          {country ? (
            <a
              className="self-center mr-2 hidden lg:block lg:w-32 hover:cursor-pointer hover:text-main-four"
              href={"/redirect/" + data.player}
            >
              {preventOverflow(data.player, 10)}
            </a>
          ) : (
            ""
          )}
          {country ? (
            <a
              className="self-center mr-4 md:hidden w-10 hover:cursor-pointer hover:text-main-four"
              href={"/redirect/" + data.player}
            >
              {preventOverflow(data.player, 7)}
            </a>
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
        <div className="p-2 bg-main-one dark:bg-gray-700 dark:text-white rounded-md shadow-md flex">
          <div
            className={`${
              currentIndex > 0 ? "block" : "invisible"
            } mr-2 hover:text-main-four font-extrabold cursor-pointer select-none`}
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
            } ml-2 hover:text-main-four font-extrabold cursor-pointer select-none`}
            onClick={() => handleDateChange(1)}
          >
            ⟶
          </div>
        </div>
        <div>
          {country ? (
            <div
              className="bg-main-one dark:bg-gray-700 dark:text-white text-xs md:text-base outline-inner shadow-md text-center ml-4 p-2 hover:bg-main-two cursor-pointer"
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
