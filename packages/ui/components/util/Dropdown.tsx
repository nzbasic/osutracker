import React from "react";
import { HiChevronDown } from "react-icons/hi2";
import classNames from "classnames";

interface DropdownProps {
  options: DropdownOption[];
  selected: DropdownOption;
  setSelected: (option: DropdownOption) => void;
  fixedWidth?: boolean;
  className?: string;
}

export interface DropdownOption {
  value: any;
  label: string;
}

const getMaxLengthLabel = (options: DropdownOption[]): string => {
  return options.reduce((prev, curr) =>
    curr.label.length > prev.label.length ? curr : prev
  ).label;
};

export function Dropdown({
  options,
  selected,
  setSelected,
  fixedWidth,
  className
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("click", () => setIsOpen(false));
    return () => window.removeEventListener("click", () => setIsOpen(false));
  });

  const handleMenuClick = (option: DropdownOption) => {
    setSelected(option);
  };
  
  const handleButtonClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(className, "relative flex flex-col cursor-pointer")}>
      <div
        className={classNames(
          "flex gap-2 p-2 items-center justify-center border border-edge rounded font-semibold select-none",
          { "text-black hover:bg-blue-500 hover:text-white": !isOpen },
          { "bg-blue-500 text-white": isOpen },
          "transition-all"
        )}
        onClick={handleButtonClick}
      >
        <div>{selected.label}</div>
        <HiChevronDown
          width={22}
          className={classNames(
            { "rotate-180": isOpen },
            "ml-auto transition-all"
          )}
        />
      </div>
      {isOpen && (
        <div
          className={classNames(
            "absolute z-10 mt-12 w-full",
            "border border-edge rounded-t",
            "bg-white"
          )}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={classNames(
                "p-2 select-none font-semibold",
                { "bg-blue-500 text-white": selected === option },
                "hover:bg-blue-500 hover:text-white",
                "transition-all"
              )}
              onClick={() => handleMenuClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
