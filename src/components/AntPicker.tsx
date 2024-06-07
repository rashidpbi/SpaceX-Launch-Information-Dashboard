import React from "react";
import { DatePicker } from "antd";
// import "antd/dist/antd.css";

const { RangePicker } = DatePicker;
type RangeValue = Parameters<NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>>[0]
function AntPicker() {
  function onOpenChange(open: boolean) {
    console.log("onOpenChange", open);
  }


  function onCalendarChange(
    dates: RangeValue
  ) {
    console.log("onCalendarChange", dates);
  }
  return (
    <div>
      <RangePicker
        onOpenChange={onOpenChange}
        onCalendarChange={onCalendarChange}
      />
    </div>
  );
}

export default AntPicker;
