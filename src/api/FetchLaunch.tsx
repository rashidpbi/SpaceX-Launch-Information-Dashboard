import React from "react";
import { getLaunches } from "./Api";
import { useEffect, useState } from "react";
import { Launch } from "../types";

function FetchLaunch() {
  const [LaunchData, setLaunchData] = useState<Launch[]>([]);
  const getLaunchData = async () => {
    const result = await getLaunches();
    let Launch: Launch[] = result.data;

    return Launch;
  };

  useEffect(() => {
    async function fetchData() {
      const LaunchData = await getLaunchData();
      setLaunchData(LaunchData);
    }
    fetchData();
  }, []);
  const renderedData = LaunchData.map((launch) => (
    <div>
      date:{launch.launch_date_utc},site:{launch.launch_site.site_name},mission:
      {launch.mission_name}
    </div>
  ));
  return <div>{renderedData}</div>;
}

export default FetchLaunch;
