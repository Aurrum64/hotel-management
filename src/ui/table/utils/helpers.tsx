import {
  PAGINATION_QUERY_PARAM_NAME,
  ROWS_PER_PAGE,
} from "../constants/constants";

export const getCurrentPage = (searchParams: URLSearchParams) =>
  !searchParams.get(PAGINATION_QUERY_PARAM_NAME)
    ? 1
    : Number(searchParams.get(PAGINATION_QUERY_PARAM_NAME));

export const getTotalPages = (totalRows: number) =>
  Math.ceil(totalRows / ROWS_PER_PAGE);
