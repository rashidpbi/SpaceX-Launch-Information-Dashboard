import React, { useEffect, useState, useRef } from 'react';
import { DateRangePicker, RangeKeyDict, createStaticRanges } from 'react-date-range';
import { useContext } from 'react';
import { LaunchContext } from "../context/LaunchContext";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'font-awesome/css/font-awesome.min.css';
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  addYears
} from "date-fns";

const today = addDays(new Date(), -1400)
const defineds = {
  startOfWeek: startOfWeek(today),
  endOfWeek: endOfWeek(today),
  startOfLastWeek: startOfWeek(addDays(today, -7)),
  endOfLastWeek: endOfWeek(addDays(today, -7)),
  startOfToday: startOfDay(today),
  startOfLastSevenDay: startOfDay(addDays(today, -7)),
  startOfLastThirtyDay: startOfDay(addDays(today, -30)),
  startOfLastNintyDay: startOfDay(addDays(today, -90)),
  startOfLast180Day: startOfDay(addDays(today, -180)),
  endOfToday: endOfDay(today),
  startOfYesterday: startOfDay(addDays(today, -1)),
  endOfYesterday: endOfDay(addDays(today, -1)),
  startOfMonth: startOfMonth(today),
  endOfMonth: endOfMonth(today),
  startOfLastMonth: startOfMonth(addMonths(today, -1)),
  endOfLastMonth: endOfMonth(addMonths(today, -1)),
  startOfYear: startOfYear(today),
  endOfYear: endOfYear(today),
  startOflastYear: startOfYear(addYears(today, -1)),
  endOflastYear: endOfYear(addYears(today, -1)),
  startOflast2Year: startOfYear(addYears(today, -2)),
  endOflast2Year: endOfYear(addYears(today, -2))
};

const initialState = {
  selection: {
    startDate: addDays(new Date(), -3720),
    endDate: addDays(new Date(), -3721),
    key: "selection"
  },
  compare: {
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    key: "compare"
  }
};

const sideBarOptions = () => {
  const customDateObjects = [
    {
      label: "past week",
      range: () => ({
        startDate: defineds.startOfLastSevenDay,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "past month",
      range: () => ({
        startDate: defineds.startOfLastThirtyDay,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "past 3 months",
      range: () => ({
        startDate: defineds.startOfLastNintyDay,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "past 6 months",
      range: () => ({
        startDate: defineds.startOfLast180Day,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "past year",
      range: () => ({
        startDate: defineds.startOflastYear,
        endDate: defineds.endOflastYear
      })
    },
    {
      label: "past 2 years",
      range: () => ({
        startDate: defineds.startOflast2Year,
        endDate: defineds.endOflast2Year
      })
    }
  ];

  return customDateObjects;
};

export default function TestPicker() {
  const context = useContext(LaunchContext);
  const state = context?.state;
  const setState = context?.setState;

  const [open, setOpen] = useState(false);
  const sideBar = sideBarOptions();
  const staticRanges = [
    ...createStaticRanges(sideBar)
  ];

  const handleSelect = (ranges: RangeKeyDict) => {
    console.log(ranges);
    if (setState && state) {
      setState({ ...state, ...ranges });
      setOpen(false); // Close the date picker after selection
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (target && !document.getElementById('date-range-picker')?.contains(target)) {
      setOpen(false); // Close the date picker if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='border flex'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>

      <button type="button" onClick={() => { setOpen(!open); }}>
        {state?.selection?.startDate ? `${state.selection.startDate.toLocaleDateString()} - ${state.selection.endDate?.toLocaleDateString()}` : 'Select Date Range'}
      </button>
      {open && (
        <div id="date-range-picker" className={open ? 'show' : 'hide'}>
          
          <DateRangePicker
            ranges={[state?.selection || initialState.selection]}
            onChange={handleSelect}
            months={2}
            minDate={addDays(new Date(), -7200)}
            maxDate={addDays(new Date(), -721)}
            direction="horizontal"
            showMonthAndYearPickers={true}
            staticRanges={staticRanges}
          />
        </div>
      )}
    </div>
  );
}
//refined