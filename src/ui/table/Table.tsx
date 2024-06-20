import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useFetchTableData } from "./api/useFetchTableData";
import { TableName } from "../../types/table-name";
import { ColDef } from "@ag-grid-community/core";
import Spinner from "../Spinner";
import styled from "styled-components";
import { ReactNode } from "react";
import { Pagination } from "./components/pagination";
import { FilterConfig } from "./types/types";

type TableProps = {
  tableName: TableName;
  columns?: ColDef[];
  leftToolbarItems?: ReactNode[];
  rightToolbarItems?: ReactNode[];
  filter?: FilterConfig;
};

const Table = ({
  tableName,
  columns,
  leftToolbarItems,
  rightToolbarItems,
  filter,
}: TableProps) => {
  const { data, count, isPending } = useFetchTableData(tableName, filter);

  return (
    <TableContainer>
      <ToolbarItems>
        {leftToolbarItems?.map((item) => item)}
        {rightToolbarItems?.map((item) => item)}
      </ToolbarItems>
      <AgGridReactContainer className="ag-theme-material">
        {isPending ? (
          <Spinner />
        ) : (
          <StyledAgGridReact
            rowData={data}
            // TODO Check any
            columnDefs={columns as any}
          />
        )}
      </AgGridReactContainer>
      <Pagination count={count || 0} />
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const ToolbarItems = styled.div`
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  height: auto;
  max-height: 100px;
`;

const AgGridReactContainer = styled.div`
  height: 500px;
  padding: 0 1rem;
`;

const StyledAgGridReact = styled(AgGridReact)`
  .ag-header-cell:last-child {
    visibility: hidden;
  }
`;
