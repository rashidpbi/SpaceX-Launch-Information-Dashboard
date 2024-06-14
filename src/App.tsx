import React, { useEffect, useState } from "react";
import "./App.css";
import { LaunchProvider } from "./context/LaunchContext";
import Filters from "./components/Filters";
import LaunchList from "./components/LaunchList";
function App() {
  return (
    <LaunchProvider>
    
      <div className="flex justify-center items-center px-16 py-5 bg-white shadow-sm max-md:px-5">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cc41e3f5c20ba3e955c74767c883f6f666c8f9837f7b4f11001fd0ba9ff1043?"
        className="max-w-full aspect-[8.33] w-[260px]"
        alt="spacex"
      />
    </div>
      <div className="flex justify-center items-center ">
        
        <div className=" ">
          <Filters />
          <LaunchList />
        </div>
      </div>
    </LaunchProvider>
  );
}

export default App;
