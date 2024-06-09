import React, { useEffect, useState } from 'react';
import { DateRangePicker, RangeKeyDict,createStaticRanges } from 'react-date-range';
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

const today = addDays(new Date(),-3721)
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
/* const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
  startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
  startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
  startOfLast180Day: startOfDay(addDays(new Date(), -180)),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOflastYear: startOfYear(addYears(new Date(), -1)),
  endOflastYear: endOfYear(addYears(new Date(), -1)),
  startOflast2Year: startOfYear(addYears(new Date(), -2)),
  endOflast2Year: endOfYear(addYears(new Date(), -2))
}; */

const initialState = {  //to include in case where state can be empty initially
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
      label: "past 2years",
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
  
  const [open, setOpen] = React.useState(false);
  const sideBar = sideBarOptions();
  const staticRanges = [
    // ...defaultStaticRanges,
    ...createStaticRanges(sideBar)
  ];


  const handleSelect = (ranges:RangeKeyDict) => {
    console.log(ranges);
    if(setState===undefined || state ===undefined)return;
    else{

      setState({ ...state, ...ranges });
    }
   
  };
  /* useEffect(()=>{
    if (!state || !setState) return;
    if(setState===undefined)return;
     setState(initialState);
  },[state,setState]) */
  return (
    <div>
     
     <button type="button" onClick={ () => { setOpen(!open); } }>{!open?'calender':'X'}</button> 
        {open?(<DateRangePicker
            // showSelectionPreview={true}
            ranges={[state?.selection || initialState.selection]}
            onChange={handleSelect}
            months={2}
            minDate={addDays(new Date(), -7200)}
            maxDate={addDays(new Date(), -721)}
            direction="horizontal"
            // scroll={{ enabled: true }}
            showMonthAndYearPickers={true}
            staticRanges={staticRanges}
        
          />):<></>}
    
    </div>
  );
 
}


