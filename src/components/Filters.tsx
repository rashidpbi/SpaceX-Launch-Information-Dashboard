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
      <div className="flex place-content-between">
        <div >
          <TestPicker />
        </div>
  
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
      <div>
      </div>
    </div>
  );
};

export default Filters;
