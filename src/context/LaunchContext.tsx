import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getLaunches } from "../Api";
import { Launch } from "../types";

interface LaunchContextProps {
  launches: Launch[];
  loading: boolean;
  filteredLaunches: Launch[];
  setFilteredLaunches: (launches: Launch[]) => void;
}

export const LaunchContext = createContext<LaunchContextProps | undefined>(
  undefined
);

export const LaunchProvider = ({ children }: { children: ReactNode }) => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await getLaunches();
      setLaunches(data);
      console.log("data:", data);
      setFilteredLaunches(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <LaunchContext.Provider
      value={{ launches, loading, filteredLaunches, setFilteredLaunches }}
    >
      {children}
    </LaunchContext.Provider>
  );
};
