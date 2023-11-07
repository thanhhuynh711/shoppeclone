import classNames from "classnames";
import { sortBy, order as orderConstant } from "../../../constants/product";
import { QueryConfig } from "../ProductList";
import { ProductListConfig } from "../../../types/product.type";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import path from "../../../constants/path";
import { omit } from "lodash";

interface Props {
  queryConfig: QueryConfig;
  pageSize: number;
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page);
  const { sort_by = sortBy.createdAt, order } = queryConfig;
  const navigate = useNavigate();
  const isActiveSorBy = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    return sort_by === sortByValue;
  };

  const handleSort = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
          },
          ["order"]
        )
      ).toString(),
    });
  };

  const handlePriceOrder = (
    orderValue: Exclude<ProductListConfig["order"], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue,
      }).toString(),
    });
  };

  return (
    <div className="bg-gray-300/40 py-4 px-3 ">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center flex-wrap gap-2">
          <div className="">Sắp xếp theo</div>
          <button
            className={classNames("h-8 px-4 capitalize  text-sm  text-center", {
              "bg-orange text-white hover:bg-orange/80": isActiveSorBy(
                sortBy.view
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSorBy(
                sortBy.view
              ),
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames("h-8 px-4 capitalize text-sm text-center", {
              "bg-orange text-white hover:bg-orange/80": isActiveSorBy(
                sortBy.createdAt
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSorBy(
                sortBy.createdAt
              ),
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames("h-8 px-4 capitalize  text-sm  text-center", {
              "bg-orange text-white hover:bg-orange/80": isActiveSorBy(
                sortBy.sold
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSorBy(
                sortBy.sold
              ),
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames("outline-none h-8 px-4 text-sm text-left", {
              " text-black ": isActiveSorBy(sortBy.price),
              "bg-white text-black hover:bg-slate-100": !isActiveSorBy(
                sortBy.price
              ),
            })}
            value={order || ""}
            onChange={(event) =>
              handlePriceOrder(
                event.target.value as Exclude<
                  ProductListConfig["order"],
                  undefined
                >
              )
            }
          >
            <option value="" disabled className="bg-white text-black">
              Giá
            </option>
            <option value={orderConstant.asc} className="bg-white text-black">
              Giá: Thấp đén cao
            </option>
            <option value={orderConstant.desc} className="bg-white text-black">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-orange">{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="ml-2 flex">
            {page === 1 ? (
              <span className="flex justify-center items-center w-9 h-8 bg-white/60 rounded-tl-sm rounded-bl-sm shadow-sm hover:bg-slate-100 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
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
                className="flex justify-center items-center w-9 h-8 bg-white rounded-tl-sm rounded-bl-sm shadow-sm hover:bg-slate-100 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className="flex justify-center items-center w-9 h-8 bg-white/60 rounded-tl-sm rounded-bl-sm shadow-sm hover:bg-slate-100 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
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
                className="flex justify-center items-center w-9 h-8 bg-white rounded-tl-sm rounded-bl-sm shadow-sm hover:bg-slate-100 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
