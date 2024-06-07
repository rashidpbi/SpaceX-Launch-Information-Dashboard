import React, { useState } from 'react';
import { DateRangePicker, RangeKeyDict,createStaticRanges } from 'react-date-range';

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

const defineds = {
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
};


const initialState = {
  selection: {
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
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


  const [state, setState] = useState(initialState);
  const sideBar = sideBarOptions();
  
  const staticRanges = [
    // ...defaultStaticRanges,
    ...createStaticRanges(sideBar)
  ];


  const handleSelect = (ranges:RangeKeyDict) => {
    console.log(ranges);
    setState({ ...state, ...ranges });
  };

  return (
    <div>
     
      <DateRangePicker
          // showSelectionPreview={true}
          ranges={[state.selection]}
          onChange={handleSelect}
          months={2}
          minDate={addDays(new Date(), -900)}
          maxDate={addDays(new Date(), 900)}
          direction="horizontal"
          // scroll={{ enabled: true }}
          showMonthAndYearPickers={true}
          staticRanges={staticRanges}
         
        />
    </div>
  );
 
}


