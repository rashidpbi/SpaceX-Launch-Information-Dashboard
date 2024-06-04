import React, { useEffect } from 'react';
import './App.css';
import { getLauches } from './Api';
import { Launch } from './types';
function App() {

  const getLaunchData = async() =>{
const result = await getLauches();
let Launch:Launch[] = result.data;
console.log(Launch)

  }
  
  useEffect(()=>{
getLaunchData();
  },[])

  return (
    <div className="App">
   Hi
    </div>
  );
}


export default App;
