import React from "react";
import moment from "moment";

export default function AverageUser({ data }) {
  return (
    <div className="rounded-md shadow-md p-2 bg-main-one mt-4 inline-flex flex-col w-64">
      <div>{"Performance: " + Math.round(data.pp) + "pp"}</div>
      <div>{"Accuracy: " + parseFloat(data.acc).toFixed(2) + "%"}</div>
      <div>{"Join Date: " + new Date(data.timeJoined).toDateString()}</div>
      <div>{"Level: " + parseFloat(data.level).toFixed(2)}</div>
      <div>{"Average Objects Per Play: " + Math.round(data.objectsPlay)}</div>
      <div>
        {"Average Play Length: " +
          moment.utc(Math.round(data.lengthPlay) * 1000).format("m:ss")}
      </div>
      <div>{"Play Count: " + Math.round(data.plays)}</div>
      <div>{"Range: " + Math.round(data.range) + "pp"}</div>
      <div>{"Farm: " + Math.round(data.farm) + "%"}</div>
    </div>
  );
}
