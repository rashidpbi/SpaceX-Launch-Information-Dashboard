import React, { useEffect } from 'react';
import './App.css';
import { getLauches } from './Api';
function App() {

  const getLaunchData = async() =>{
const data = await getLauches();
console.log(data)
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
