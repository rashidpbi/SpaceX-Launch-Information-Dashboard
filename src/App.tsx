import React, { useEffect, useState } from "react";
import "./App.css";
import { LaunchProvider } from "./context/LaunchContext";
import Filters from "./components/Filters";
import LaunchList from "./components/LaunchList";
function App() {
  return (
    <LaunchProvider>
      <div className="flex justify-center items-center my-16">
        <div className=" ">
          <Filters />
          <LaunchList />
        </div>
      </div>
    </LaunchProvider>
  );
}

export default App;
