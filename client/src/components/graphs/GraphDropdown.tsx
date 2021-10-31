import { useContext } from "react";
import Select, { SingleValue } from "react-select";
import { ThemeContext } from "../../ThemeProvider";
import { getTheme } from "../../util/selectTheme";

export interface Option {
    value: string,
    label: string,
    reversed?: boolean
}

export default function GraphDropdown({ onChange, selected, options }: {
    onChange: (option: Option | null) => void,
    selected: Option,
    options: Option[]
}) {
  const select = (event: SingleValue<Option | null>) => {
    onChange(event);
  };
  const theme = useContext(ThemeContext);

  return (
    <div className="flex flex-row items-center">
      <span>Graph: </span>
      <div className="w-52 md:w-72 ml-4">
        <Select
          options={options}
          defaultValue={
            selected
              ? options.find((item: Option) => item.value === selected.value)
              : options[0]
          }
          onChange={select}
          isSearchable={false}
          theme={(selectTheme) => getTheme(theme, selectTheme)}
        />
      </div>
    </div>
  );
}
