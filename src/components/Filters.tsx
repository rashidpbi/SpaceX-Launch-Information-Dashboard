import React, { useState, useContext, useEffect } from "react";
import { LaunchContext } from "../context/LaunchContext";
import TestPicker from "./TestPicker";
const Filters = () => {
  const context = useContext(LaunchContext);
  const [status, setStatus] = useState("all");

  //   const [startDate, setStartDate] = useState('');
  //   const [endDate, setEndDate] = useState('');
  //   const [customRange, setCustomRange] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const launches = context?.launches;
  const setFilteredLaunches = context?.setFilteredLaunches;
  useEffect(() => {
    if (!launches || !setFilteredLaunches) return; // Early return inside useEffect

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

    if (dateRange !== "all") {
      const pastDate = new Date();
      pastDate.setFullYear(2014, 9, 21);
      const presentDate = new Date();
      presentDate.setFullYear(2014, 9, 21);

      if (dateRange === "past 3months") {
        pastDate.setMonth(pastDate.getMonth() - 3);
        filtered = filtered.filter(
          (launch) =>
            new Date(launch.launch_date_utc) >= pastDate &&
            new Date(launch.launch_date_utc) <= presentDate
        );
      }
      if (dateRange === "past 6months") {
        pastDate.setMonth(pastDate.getMonth() - 6);
        filtered = filtered.filter(
          (launch) =>
            new Date(launch.launch_date_utc) >= pastDate &&
            new Date(launch.launch_date_utc) <= presentDate
        );
      }
      //   filtered = filtered.filter(launch => new Date(launch.launch_date_utc) >= new Date(startDate) && new Date(launch.launch_date_utc) <= new Date(endDate));
      /* } else if (startDate) {
      const pastDate = new Date();
      pastDate.setFullYear(2014,9,21);
      console.log("past date",pastDate)
      if (startDate === '3months') pastDate.setMonth(pastDate.getMonth() - 3);
      if (startDate === '6months') pastDate.setMonth(pastDate.getMonth() - 6);
      filtered = filtered.filter(launch => new Date(launch.launch_date_utc) >= pastDate); */
    }

    setFilteredLaunches?.(filtered);
  }, [status, dateRange, launches, setFilteredLaunches]);

  if (!context) return null; // Early return here is safe now

  return (
    <div>
      <div>
       <TestPicker/>
        <label>Status:</label>
        <select
          title="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div>
        <label>Date Range:</label>
        <select
          title="date"
          value={dateRange}
          onChange={(e) => {
            const value = e.target.value;
            setDateRange(value);
            //   setCustomRange(value === 'custom');
          }}
        >
          <option value="">All</option>
          <option value="past 3months">Past 3 Months</option>
          <option value="past 6months">Past 6 Months</option>
        </select>
        {/* {customRange && (
          <div>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Filters;
