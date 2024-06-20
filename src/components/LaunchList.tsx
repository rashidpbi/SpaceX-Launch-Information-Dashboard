import  { useContext, useState } from "react";
import { LaunchContext } from "../context/LaunchContext";
import { Launch } from "../types";
import LaunchModal from "./LaunchModal";
import { useModal } from "../hooks/useModal";
import Pagination from "./Pagination";

const LaunchList = () => {
  type ItemsToDisplay = any[] | any;
  const context = useContext(LaunchContext);
  const itemsPerPage: number = 9;
  const paginatedItems: Object[] = [];
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const { modal, openModal, closeModal } = useModal({
    
    children: selectedLaunch ? (
      <div className="">
        <div className="flex">
          <button
            type="button"
            title="button"
            className="btn ml-auto "
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

  if (loading)
    return (
      <div className="">
        <div className="mt-8 border rounded  h-[400px] w-[1100px] ">
          <table className="w-[1100px] ">
            <thead className=" h-4 ">
              <tr className="w-[1100px] ">
                <th className="px-8">No:</th>
                <th className="px-8">Launched (UTC)</th>
                <th className="px-8">Location</th>
                <th className="px-8">Mission</th>
                <th className="px-8">Orbit</th>
                <th className="px-8">Launch Status</th>
                <th className="px-8">Rocket</th>
              </tr>
            </thead>
            <tbody className="">
              <tr>
                <td colSpan={7} className="text-center py-4">
                  <iframe
                    src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40"
                    width="480"
                    height="480"
                    frameBorder="0"
                    className="giphy-embed  mx-auto"
                    allowFullScreen
                    title="loading"
                  ></iframe>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

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
    <div className="">
      <div className="mt-8 border rounded  h-[400px] w-[1100px] overflow-hidden">
        <table className="w-[1100px] ">
          <thead className=" h-4 bg-gray-100  ">
            <tr className="w-[1100px] ">
              <th className="px-8">No:</th>
              <th className="px-8">Launched (UTC)</th>
              <th className="px-8">Location</th>
              <th className="px-8">Mission</th>
              <th className="px-8">Orbit</th>
              <th className="px-8">Launch Status</th>
              <th className="px-8">Rocket</th>
            </tr>
          </thead>
          <tbody className="">
            {}
            {itemsToDisplay.length > 0 ? (
              itemsToDisplay.map((launch: any, index: any) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(launch)}
                  className="text-center cursor-pointer w-[1100px]"
                >
                  <td className="py-2">
                    {itemsPerPage * currentPage + (index + 1)}
                  </td>
                  <td>
                    {new Date(launch.launch_date_utc)
                      .toUTCString()
                      .substring(0, 17)}
                  </td>
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
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No results found for the specified filter.
                </td>
              </tr>
            )}
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
