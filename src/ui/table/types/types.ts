import { SimpleMap } from "../../../types/common-types";

export type TableData = {
    data: SimpleMap<any>[];
    count: number | null;
  };

type FilterType = "eq" | "gt" | "gte" | "lt" | "lte";

export type Filter =
  | {
      fieldName: string;
      fieldValue: string;
      type: FilterType;
    }
  | undefined;

export type QueryParamName = {
  queryParamName: string;
};

export type FilterBySearchParam = QueryParamName & {
  type?: FilterType;
};

export type FilterTransformTemplate = QueryParamName & {
  transformTemplate: (fieldValue: string) => Filter;
};

export type FilterConfig = FilterBySearchParam | FilterTransformTemplate;