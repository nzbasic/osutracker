import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LinearProgress, Zoom } from "@material-ui/core";
import "../../css/Main.css";

export default function UserDetails({ data }) {
  if (data.length == 0) {
    return <div>Error loading user info! Please refresh.</div>;
  }

  return (
    <div className="bg-main-one flex-wrap rounded-md p-4 lg:mt-4 mb-2 mx-2 shadow-lg flex mt-14 md:mt-16 text-xs md:text-sm">
      <div className="hidden off:block outline-inner w-28 md:w-40 lg:w-auto">
        <Image link={data.url} height={320} width={320} />
      </div>
      <div className="flex flex-col">
        <div className="flex lg:text-lg font-bold px-0.5 md:px-2 lg:pt-4">
          {data.name}
          <div className="outline-inner self-center mx-2 w-5 md:w-auto">
            <Image
              link={
                "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                data.country +
                ".svg"
              }
              height={12}
              width={28}
            />
          </div>
        </div>
        <div className="flex lg:text-lg h-full font-semibold lg:pt-12 md:pt-4 pt-2">
          <div className="flex flex-col px-0.5 md:px-2 justify-between h-full ">
            <div>{data.pp + "pp"}</div>
            <div>{"#" + data.rank}</div>
            <div>{parseFloat(data.acc).toFixed(2) + "%"}</div>
            <div>{data.plays + " Plays"}</div>
          </div>
          <div className="flex flex-col justify-between ">
            {new Date(data.joined).toDateString()}
            <div className="flex align-center ">
              {"Range: " + Math.floor(data.range) + "pp"}
              <div className="h-5 hidden tiny:block">
                <Tooltip
                  title="Performance difference between highest and lowest play in top 100."
                  placement="bottom"
                  className="self-center"
                  TransitionComponent={Zoom}
                >
                  <div className="pl-1 font-extrabold">(?)</div>
                </Tooltip>
              </div>
            </div>
            <div className="flex align-center">
              <div className="">{"Farm: " + data.farm + "%"}</div>
              <div className="h-5 hidden tiny:block">
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
            <a className="text-main-four outline-none" target="_blank" rel="noreferrer" href={"https://osu.ppy.sh/users/" + data.id}>Link</a>
          </div>
        </div>
      </div>
      <div>
        <div className="w-28 md:w-40 lg:w-80 ml-2 hidden ms:block text-xs md:text-md lg:text-xl">
           <CircularProgressbarWithChildren value={(data.level %1).toFixed(2)*100}>
             <div>
               {"Level: " + Math.floor(data.level)}
             </div>
             <div>
               {((data.level %1)*100).toFixed(2) + "%"}
             </div>
           </CircularProgressbarWithChildren>
         </div>
      </div>
      <div className="hidden off:block ms:hidden w-full py-2 flex">
           <div>Level {Math.floor(data.level)}</div>
           <LinearProgress
             value={(data.level %1).toFixed(2)*100}
             variant="determinate"
           />
       </div>
    </div>
  );

  // return (
  //   <div id="firstDiv min" className="bg-main-one rounded-md shadow-lg inline-flex flex-wrap md:flex-row mt-14 mb-2 ml-2 py-2 px-2 lg:py-4 lg:m-4 lg:px-4 text-xs tiny:text-sm lg:text-xl font-semibold ">
  //     <div className="flex">
  //       <div className="hidden off:block outline-inner w-24 md:w-40 lg:w-auto">
  //         <Image
  //           link={data.url}
  //           height={320}
  //           width={320}
  //         />
  //       </div>
  //       <div className="flex flex-col justify-between py-1 px-1 lg:p-1 lg:py-6 lg:text-lg">
  //         <div className="flex">
  //           {data.name}
  //           <div className="outline-inner self-center mx-2 w-5 md:w-auto">
  //             <Image
  //               link={
  //                 "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
  //                 data.country +
  //                 ".svg"
  //               }
  //               height={12}
  //               width={28}
  //             />
  //           </div>
  //         </div>
  //         <div>
  //           {data.pp + "pp"}
  //         </div>
  //         <div>
  //           {"#" + data.rank}
  //         </div>
  //         <div>
  //           {parseFloat(data.acc).toFixed(2) + "%"}
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex justify-between ">
  //       <div className="flex flex-col justify-between py-1 lg:p-1 lg:py-12 pt-4 md:text-md lg:text-lg">
  //         <div>
  //           {new Date(data.joined).toDateString()}
  //         </div>
  //         <div className="flex align-center ">
  //           {"Range: " + Math.floor(data.range) + "pp"}
  //           <div className="h-5 hidden tiny:block">
  //             <Tooltip
  //               title="Performance difference between highest and lowest play in top 100."
  //               placement="bottom"
  //               className="self-center"
  //               TransitionComponent={Zoom}
  //             >
  //               <HelpOutlineIcon size="small" className="h-5"/>
  //             </Tooltip>
  //           </div>

  //         </div>
  //         <div className="flex align-center">
  //           <div className="">
  //             {"Farm: " + data.farm + "%"}
  //           </div>
  //           <div className="h-5 hidden tiny:block">
  //             <Tooltip
  //               title="Percentage of plays in top 100 where the beatmap was made by a common pp mapper (e.g. Sotarks)"
  //               placement="bottom"
  //               className="self-center"
  //               TransitionComponent={Zoom}
  //             >
  //               <HelpOutlineIcon size="small" className="self-center"/>
  //             </Tooltip>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="w-24 md:w-40 lg:w-80 ml-2 hidden ms:block text-xs md:text-md lg:text-xl">
  //         <CircularProgressbarWithChildren value={(data.level %1).toFixed(2)*100}>
  //           <div>
  //             {"Level: " + Math.floor(data.level)}
  //           </div>
  //           <div>
  //             {((data.level %1)*100).toFixed(2) + "%"}
  //           </div>
  //         </CircularProgressbarWithChildren>
  //       </div>
  //     </div>
  //     <div className="hidden off:block ms:hidden w-full py-2 flex">
  //         <div>Level {Math.floor(data.level)}</div>
  //         <LinearProgress
  //           value={(data.level %1).toFixed(2)*100}
  //           variant="determinate"
  //         />
  //     </div>
  //   </div>
  // );
}
