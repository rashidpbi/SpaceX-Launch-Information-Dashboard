import React, { useContext, useEffect, useState } from "react";
import { LaunchContext } from "../context/LaunchContext";
import { Launch } from "../types";
import LaunchModal from "../api/LaunchModal";
import { useModal } from "../hooks/useModal";
import Pagination from "./Pagination";

const LaunchList = () => {
  type ItemsToDisplay = any[] | any;
  const context = useContext(LaunchContext);
  const itemsPerPage: number = 9;
  const paginatedItems: Object[] = [];
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const { modal, openModal, closeModal } = useModal({
    //
    children: selectedLaunch ? (
      <div className="bg-green-300">
        <div className="bg-red-900 flex">
          <button
            type="button"
            title="button"
            className="btn ml-auto bg-red-200"
            onClick={() => closeModal()}
          >
            X
          </button>
        </div>
        <LaunchModal launch={selectedLaunch} />
      </div>
    ) : null,
  });

  if (!context) return <div>Loading...</div>;
  const { filteredLaunches, loading, currentPage, setCurrentPage } = context;

  if (loading) return <div>Loading...</div>;

  const handleRowClick = (launch: Launch) => {
    //
    setSelectedLaunch(launch);
    openModal();
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  for (let i = 0; i < filteredLaunches.length; i += itemsPerPage) {
    paginatedItems.push(filteredLaunches.slice(i, i + itemsPerPage));
  }

  let itemsToDisplay: ItemsToDisplay;
  if (paginatedItems[currentPage] !== (null || undefined)) {
    itemsToDisplay = paginatedItems[currentPage];
  } else {
    itemsToDisplay = [];
  }

  return (
    <div>
      <div className="mt-8 border rounded">
        <table className=" ">
          <thead className="bg-gray-100">
            <tr className="">
              <th className="px-8">No:</th>
              <th className="px-8">Launched (UTC)</th>
              <th className="px-8">Location</th>
              <th className="px-8">Mission</th>
              <th className="px-8">orbit</th>
              <th className="px-8">Launch Status</th>
              <th className="px-8">Rocket</th>
            </tr>
          </thead>
          <tbody>
            {}
            {itemsToDisplay.map((launch: any, index: any) => (
              <tr
                key={index}
                onClick={() => handleRowClick(launch)}
                className="text-center cursor-pointer"
              >
                <td className="py-2">
                  {itemsPerPage * currentPage + (index + 1)}
                </td>
                <td>{new Date(launch.launch_date_utc).toUTCString()}</td>
                <td>{launch.launch_site.site_name}</td>
                <td>{launch.mission_name}</td>
                <td>
                  {launch.rocket?.second_stage?.payloads?.[1]?.orbit ||
                    "Unknown"}
                </td>
                <td className="flex justify-center items-center py-2">
                  {launch.launch_success ? (
                    <div className="text-green-900 bg-green-100  rounded-3xl w-20 justify-center font-semibold">
                      Success
                    </div>
                  ) : launch.upcoming ? (
                    <div className="text-amber-800 bg-yellow-100 rounded-3xl w-24 justify-center font-semibold">
                      upcoming
                    </div>
                  ) : (
                    <div className="text-rose-800 bg-rose-200 rounded-3xl w-16 justify-center font-semibold">
                      failure
                    </div>
                  )}
                </td>
                <td>{launch.rocket.rocket_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={paginatedItems.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LaunchList;
