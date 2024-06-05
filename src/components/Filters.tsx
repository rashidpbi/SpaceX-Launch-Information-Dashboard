import React, { useState, useContext, useEffect } from 'react';
import { LaunchContext } from '../context/LaunchContext';
const Filters = () => {
  const context = useContext(LaunchContext);
  const [status, setStatus] = useState('all');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [customRange, setCustomRange] = useState(false);
const launches = context?.launches;
  const setFilteredLaunches = context?.setFilteredLaunches;
  useEffect(() => {
    if (!launches || !setFilteredLaunches) return; // Early return inside useEffect

    let filtered = launches;

    if (status !== 'all') {
      if (status === 'upcoming') {
        filtered = filtered.filter(launch => launch.upcoming);
      } else if (status === 'success') {
        filtered = filtered.filter(launch => launch.launch_success===true);
      } else if (status === 'failure') {
        filtered = filtered.filter(launch => launch.launch_success === false);
      }
    }

    /* if (startDate && endDate) {
      filtered = filtered.filter(launch => new Date(launch.date_utc) >= new Date(startDate) && new Date(launch.date_utc) <= new Date(endDate));
    } else if (startDate) {
      const pastDate = new Date();
      if (startDate === '3months') pastDate.setMonth(pastDate.getMonth() - 3);
      if (startDate === '6months') pastDate.setMonth(pastDate.getMonth() - 6);
      filtered = filtered.filter(launch => new Date(launch.date_utc) >= pastDate);
    } */

    setFilteredLaunches?.(filtered);
  }, [status,launches, setFilteredLaunches]);

  if (!context) return null; // Early return here is safe now

  return (
    <div>
      <div>
        <label>Status:</label>
        <select title='status' value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div>
       {/*  <label>Date Range:</label>
        <select value={startDate} onChange={e => {
          const value = e.target.value;
          setStartDate(value);
          setCustomRange(value === 'custom');
        }}>
          <option value="">All</option>
          <option value="3months">Past 3 Months</option>
          <option value="6months">Past 6 Months</option>
          <option value="custom">Custom Range</option>
        </select>
        {customRange && (
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
