import React from "react";
import moment from "moment";

export default function AverageCountry({ data }) {
  return (
    <div className="rounded-md shadow-md p-2 bg-main-one mt-4 flex flex-col w-64">
      <div>{"Performance: " + Math.round(data.pp) + "pp"}</div>
      <div>{"Accuracy: " + parseFloat(data.acc * 100).toFixed(2) + "%"}</div>
      <div>{"Average Objects Per Play: " + Math.round(data.objectsPlay)}</div>
      <div>
        {"Average Play Length: " +
          moment.utc(Math.round(data.lengthPlay) * 1000).format("m:ss")}
      </div>
      <div>{"Range: " + Math.round(data.range) + "pp"}</div>
      <div>{"Farm: " + Math.round(data.farm) + "%"}</div>
    </div>
  );
}
