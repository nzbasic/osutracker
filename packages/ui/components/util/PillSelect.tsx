"use client"

import cn from 'classnames';

type Option = {
    label: string;
    value: string;
    count?: number;
}

type Props<T extends Option> = {
    options: T[];
    selected: T;
    setSelected: (option: T) => void;
}

function PillSelect<T extends Option>({ options, selected, setSelected }: Props<T>) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button 
                    key={option.value} 
                    onClick={() => setSelected(option)} 
                    className={cn('flex items-center rounded-full border text-xs md:text-sm p-2 px-4 select-none text-primary-dark whitespace-nowrap', {
                    'bg-blue-200 border-none hover:bg-blue-200 hover:border-blue-400': option.value !== selected.value,
                    'bg-secondary border-none': option.value === selected.value,
                })}>
                    <span>{option.label}</span>
                    {option.count && <span className="ml-2 font-medium text-xs text-primary-dark">{option.count}</span>}
                </button>
            ))}
        </div>
    )
}

export default PillSelect;
