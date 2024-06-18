import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination(props: IPagination) {
  const { currentPage, totalPages, onPageChange } = props;

  const handlePrevClick = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const visiblePageCount = 3;
    const pageNumbers: number[] = [];

    if (totalPages <= visiblePageCount) {
      pageNumbers.push(...Array.from({ length: totalPages }, (_, i) => i));
    } else {
      const firstPage = 0;
      const lastPage = totalPages - 1;

      const midPageCount = visiblePageCount - 2;

      const step = Math.floor(midPageCount / 2);

      pageNumbers.push(firstPage);

      if (currentPage < firstPage + step) {
        pageNumbers.push(
          ...Array.from(
            { length: Math.min(midPageCount, totalPages) },
            (_, i) => firstPage + i + 1
          )
        );
      } else if (currentPage > lastPage - step) {
        pageNumbers.push(
          ...Array.from(
            { length: Math.min(midPageCount, totalPages) },
            (_, i) => lastPage - midPageCount + i
          )
        );
      } else {
        const start = currentPage - step;
        const end = currentPage + step;

        pageNumbers.push(
          ...Array.from({ length: midPageCount }, (_, i) => start + i + 1)
        );
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-end mt-4  bg-white py-3">
      <div className=" flex w-fit ">
        <nav id="pagination" className="flex  items-center ">
          <div>
            <button
              title="button"
              type="button"
              className={`page-item  relative inline-flex  items-center  border  border-gray-300 bg-white   text-sm md:text-md p-2 font-medium text-gray-700 hover:bg-gray-50   m-0
                  ${
                    currentPage === 0
                      ? "bg-gray-500 text-white cursor-not-allowed "
                      : "bg-red-500  text-white"
                  }`}
              onClick={handlePrevClick}
              disabled={currentPage === 0}
            >
              <ChevronLeftIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="flex  w-full  items-center justify-center ">
            {pageNumbers.map((pageNumber) => (
              <div
                key={pageNumber}
                className={`page-item ${
                  pageNumber === currentPage
                    ? "active border border-gray-300 "
                    : ""
                }`}
              >
                <button
                  className="page-link text-sm md:text-md p-2 px-3 border"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </div>
            ))}
          </div>
          <div>
            <button
              title="button"
              type="button"
              className={`page-item text-sm md:text-md p-2  relative inline-flex  items-center  border  border-gray-300 bg-white ${
                currentPage === totalPages - 1
                  ? "disabled bg-gray-500 text-white cursor-not-allowed"
                  : "bg-red-500  text-white"
              }`}
              onClick={handleNextClick}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRightIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
