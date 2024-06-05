import React, { useEffect, useState } from "react";
import "./App.css";
import { LaunchProvider } from "./context/LaunchContext";
import LaunchList from "./components/LaunchList";
import Filters from "./components/Filters";
function App() {
 
  return (<LaunchProvider>

<div className="App"><div>
    
    <Filters/><LaunchList/></div></div>
  </LaunchProvider>);
}

export default App;
