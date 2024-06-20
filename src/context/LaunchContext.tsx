import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getLaunches } from "../api/Api";
import { Launch,InitialState } from "../types";
import {
  addDays
} from "date-fns";
interface LaunchContextProps {
  launches: Launch[];
  loading: boolean;
  filteredLaunches: Launch[];
  setFilteredLaunches: (launches: Launch[]) => void;
  state:InitialState,
  setState:(state:InitialState)=>void;
  currentPage:number,
  setCurrentPage:(currentPage:number)=>void;
}

export const LaunchContext = createContext<LaunchContextProps | undefined>(
  undefined
);

export const LaunchProvider = ({ children }: { children: ReactNode }) => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const initialState = {
    selection: {
      startDate: addDays(new Date(), -1612),
      endDate: addDays(new Date(), -1050),
      key: "selection"
    },
    compare: {
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      key: "compare"
    }
  };
  const [state,setState] = useState(initialState);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await getLaunches();
      setLaunches(data);
     
      setFilteredLaunches(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <LaunchContext.Provider
      value={{ launches, loading, filteredLaunches, setFilteredLaunches,state,setState,currentPage,setCurrentPage }}
    >
      {children}
    </LaunchContext.Provider>
  );
};
