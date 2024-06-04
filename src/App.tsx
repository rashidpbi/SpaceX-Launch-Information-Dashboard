import React, { useEffect, useState } from 'react';
import './App.css';
import { getLauches } from './Api';
import { Launch } from './types';
function App() {
const [LaunchData,setLaunchData] = useState<Launch[]>([]);
  const getLaunchData = async() =>{
const result = await getLauches();
let Launch:Launch[] = result.data;
console.log(Launch)
return Launch;

  }
  
  useEffect( ()=>{
    async function fetchData(){

      const LaunchData = await getLaunchData();
      setLaunchData(LaunchData);
      
    }
   fetchData();
  },[])

  return (
    <div className="App">
  {LaunchData.map((launch)=>launch.mission_name)}
    </div>
  );
}


export default App;
