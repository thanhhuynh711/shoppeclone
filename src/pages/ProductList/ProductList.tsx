import { useQuery } from "@tanstack/react-query";
import { omitBy, isUndefined } from "lodash";
import AsideFilter from "./AsideFilter";
import Product from "./Product";
import SortProductList from "./SortProductList";
import useQueryParams from "../../hooks/useQueryParams";
import pruductApi from "../../apis/product.api";
import Pagination from "../../components/Paginate";
import { useState } from "react";
import { ProductListConfig } from "../../types/product.type";

export type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit || "20",
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
    },
    isUndefined
  );
  const { data } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return pruductApi.getProducts(queryConfig as ProductListConfig);
    },
    keepPreviousData: true,
  });
  console.log(data);

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        {data && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AsideFilter />
            </div>
            <div className="col-span-9">
              <SortProductList
                queryConfig={queryConfig}
                pageSize={data.data.data.pagination.page_size}
              />
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {data.data.data.products.map((product) => (
                  <div key={product._id} className="col-span-1">
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={data.data.data.pagination.page_size}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
