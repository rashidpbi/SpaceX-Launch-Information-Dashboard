import React, { useState } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'font-awesome/css/font-awesome.min.css';

interface RangeState {
  startDate: Date;
  endDate: Date;
  key: string;
}


export default function Picker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange:RangeState = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges:RangeKeyDict) => {
    const { selection } = ranges;
    if (selection.startDate && selection.endDate) {
      setStartDate(selection.startDate);
      setEndDate(selection.endDate);
    }
  };
  const [isShow, setIsShow] = React.useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
    console.log("isshow:",isShow);
  };
  // if (isShow) {
  return (
    <div>
      <div className="form-group" onClick={handleClick}>
        hi
        <div
          className="input-group date"
          id="datetimepicker1"
          data-target-input="nearest"
        >
          <input
            disabled
            title='text'
            type="text"
            className="form-control datetimepicker-input"
            data-target="#datetimepicker1"
            name="params['start_time']"
          />
          <div
            className="input-group-append"
            data-target="#datetimepicker1"
            data-toggle="datetimepicker"
          >
            <div className="input-group-text">
              <i className="fa fa-calendar"></i>
            </div>
          </div>
        </div>
      </div>
      {isShow ? (
        
        <DateRangePicker
          ranges={[selectionRange]}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          onChange={handleSelect}
          showMonthArrow={false}
          
          
        />
      ) : (
        <div>calender</div>
      )}
    </div>
  );
  // } else {
  //   return <button onClick={handleClick}>Show/Hide</button>;
  // }
}


