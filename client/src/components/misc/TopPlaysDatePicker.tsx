import React, { forwardRef, useEffect } from 'react';
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export const TopPlaysDatePicker = ({ selected, dates, onClick }: { selected: Date, dates: number[], onClick: (i: number) => void }) => {
    const CustomInput = forwardRef(({ value, onClick }: any, ref: React.LegacyRef<HTMLButtonElement>) => (
        <button
            className="text-white bg-blue-500 rounded px-2 py-1 w-32"
            onClick={onClick}
            ref={ref}
        >
            {value}
        </button>
    ))

    const onChange = (date: Date) => {
        // the datepicker changes the date by a little bit for some reason so we can only compare the first 5 digits
        selected = date
        onClick(dates.findIndex(date => date.toString().substring(0, 5) === selected.getTime().toString().substring(0, 5)))
    }

    return (
        <div className="text-black w-32 z-10">
            <DatePicker
                selected={selected}
                onChange={onChange}
                includeDates={dates.map(date=> new Date(date))}
                customInput={<CustomInput />}
                allowSameDay={true}
            />
        </div>
        
    )
}