import React from "react";
import Select from "react-select";

export default function GraphDropdown({ onChange, selected, options }) {
  const select = (event) => {
    onChange(event);
  };

  return (
    <div className=" bg-main-one p-4 rounded-md shadow-md flex flex-row items-center w-smgraph lg:w-graph">
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
          isSearchable={false}
        />
      </div>
    </div>
  );
}
