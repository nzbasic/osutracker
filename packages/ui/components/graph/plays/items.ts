import { DropdownOption } from "../../util/Dropdown";

export type XAccessor = "date" | "hour";

export const dropdownOptions: DropdownOption[] = [
  {
    value: "date",
    label: "By Date",
  },
  {
    value: "hour",
    label: "By Hour",
  },
];
