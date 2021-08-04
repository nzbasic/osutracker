import React from "react";
import Select from "react-select";

const options = [
  { value: "pp", label: "Performance", reversed: false },
  { value: "rank", label: "Rank", reversed: true },
  { value: "acc", label: "Accuracy", reversed: false },
  { value: "plays", label: "Play Count", reversed: false },
  { value: "farm", label: "Farm", reversed: false },
  { value: "range", label: "Range", reversed: false },
  { value: "score", label: "Score", reversed: false },
  { value: "countryRank", label: "Country Rank", reversed: true },
];

export default function GraphDropdown({ onChange, selected }) {
  const select = (event) => {
    onChange(event);
  };

  return (
    <div className=" bg-main-one p-4 rounded-md shadow-md flex flex-row items-center">
      <span>Graph: </span>
      <div className="w-72 ml-4">
        <Select
          options={options}
          defaultValue={
            selected
              ? options.find((item) => item.value === selected)
              : options[0]
          }
          onChange={select}
        />
      </div>
    </div>
  );
}
