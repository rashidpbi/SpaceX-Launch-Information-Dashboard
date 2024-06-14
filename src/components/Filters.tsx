import React, { useState, useContext, useEffect } from "react";
import { LaunchContext } from "../context/LaunchContext";
import TestPicker from "./TestPicker";
const Filters = () => {
  const context = useContext(LaunchContext);
  const [status, setStatus] = useState("all launches");

  const startDate = context?.state.selection.startDate;
  const endDate = context?.state.selection.endDate;
  const launches = context?.launches;
  const setFilteredLaunches = context?.setFilteredLaunches;
  const state = context?.state;
  useEffect(() => {
    if (!launches || !setFilteredLaunches||!state) return; // Early return inside useEffect

    let filtered = launches;

    if (status !== "all") {
      if (status === "upcoming") {
        filtered = filtered.filter((launch) => launch.upcoming);
      } else if (status === "success") {
        filtered = filtered.filter((launch) => launch.launch_success === true);
      } else if (status === "failure") {
        filtered = filtered.filter((launch) => launch.launch_success === false);
      }
    }
    if(startDate&&endDate){
      filtered=filtered.filter((launch)=>
        new Date(launch.launch_date_utc) >= startDate &&
      new Date(launch.launch_date_utc) <= endDate)
    }
   

    setFilteredLaunches?.(filtered);
  }, [status,startDate,endDate, launches, setFilteredLaunches,state]);

  if (!context) return null; // Early return here is safe now

  return (
    <div>
      <div className="flex place-content-between my-12">
        
        <div >
          <TestPicker />
        </div>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          <select
            title="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All launches</option>
            <option value="success">Success launches</option>
            <option value="failure">Failure launches</option>
            <option value="upcoming">Upcoming launches</option>
          </select>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Filters;
