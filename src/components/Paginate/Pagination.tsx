import classNames from "classnames";
import { QueryConfig } from "../../pages/ProductList/ProductList";
import { Link, createSearchParams } from "react-router-dom";
import path from "../../constants/path";

interface Props {
  queryConfig: QueryConfig;
  pageSize: number;
}

const RANHE = 2;
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page);
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="bg-white rounded px-3 py-2 shadow-sm mx-2 border"
          >
            ...
          </span>
        );
      }
      return null;
    };

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border"
          >
            ...
          </span>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pagaNumber = index + 1;
        //điều kiện đễ return về ...
        if (
          page <= RANHE * 2 + 1 &&
          pagaNumber > page + RANHE &&
          pagaNumber < pageSize - RANHE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANHE * 2 + 1 && page < pageSize - RANHE * 2) {
          if (pagaNumber < page - RANHE && pagaNumber > RANHE) {
            return renderDotBefore(index);
          } else if (
            pagaNumber > page + RANHE &&
            pagaNumber < pageSize - RANHE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANHE * 2 &&
          pagaNumber > RANHE &&
          pagaNumber < page - RANHE
        ) {
          return renderDotBefore(index);
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pagaNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames(
              "bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border",
              {
                "border-cyan-500": pagaNumber === page,
                "border-transparent": pagaNumber !== page,
              }
            )}
          >
            {pagaNumber}
          </Link>
        );
      });
  };
  return (
    <div className="flex flex-wrap mt-6 justify-center">
      {page === 1 ? (
        <span className="bg-white/60 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border">
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString(),
            }).toString(),
          }}
          className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border"
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <span className="bg-white/60 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border">
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString(),
            }).toString(),
          }}
          className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border"
        >
          Next
        </Link>
      )}
    </div>
  );
}
