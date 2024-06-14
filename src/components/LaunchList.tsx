import React, { useContext, useState } from 'react';
import { LaunchContext } from '../context/LaunchContext';
import { Launch } from '../types';
import LaunchModal from '../api/LaunchModal';
const LaunchList = () => {
  const context = useContext(LaunchContext);

  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  if (!context) return <div>Loading...</div>;
  const { filteredLaunches, loading } = context;

  if (loading) return <div>Loading...</div>;

  return (
    <div className='my-8'>
      <table>
        <thead>
          <tr>
            <th>No:</th>
            <th>Launched (UTC)</th>
            <th>Location</th>
            <th>Mission</th>
            <th>orbit</th>

            <th>Launch Status</th>
            <th>Rocket</th>
          </tr>
        </thead>
        <tbody>
          {filteredLaunches.map((launch,index) => (
            <tr key={index} onClick={() => setSelectedLaunch(launch)}>
              <td>{index+1}</td>
              <td>{new Date(launch.launch_date_utc).toUTCString()}</td>
              <td>{launch.launch_site.site_name}</td>
              <td>{launch.mission_name}</td>
              <td>{launch.rocket?.second_stage?.payloads?.[1]?.orbit || 'Unknown'}</td>
              <td>{launch.launch_success ? 'Success' : launch.upcoming ? 'Upcoming' : 'Failure'}</td>
              <td>{launch.rocket.rocket_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedLaunch && <LaunchModal launch={selectedLaunch} onClose={() => setSelectedLaunch(null)} />}
    </div>
  );
};

export default LaunchList;
