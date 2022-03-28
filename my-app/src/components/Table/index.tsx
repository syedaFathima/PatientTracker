import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@material-ui/core";

import EnhancedTableRow, { TableRowData } from "./EnhancedTableRow";
import EnhancedTableHead, {
  TableColumns as TableColumnsType,
  Order as OrderType,
} from "./EnhancedTableHead";
import { useStyles } from "./styles";
import { SortOptions, lodashSort } from "../../utils/patientHelper";

export interface TableSortOptions extends SortOptions {
  orderBy: string;
}

interface ControlledTableProps {
  cellHeight?: number | string;
  checkboxSelection?: boolean;
  className?: string;
  collapsible?: boolean;
  columns: TableColumns[];
  data: TableRowData[] | null;
  defaultSortOptions?: TableSortOptions[];
  expandOnRowClick?: boolean;
  headerClassName?: any;
  hover?: boolean;
  loading?: boolean;
  minHeight?: string;
  manualPagination?: boolean;
  manualSort?: boolean;
  noDataText?: string;
  onSetPage?: (number: number) => void;
  onSetRowsPerPage?: (number: number) => void;
  onRowClick?: (event: React.MouseEvent, data: any) => void;
  onRequestSort?: (sortOptions: SortOptions[]) => void;
  onSelectAllClick?: (event: React.MouseEvent) => void;
  placeholderSize?: "small" | "medium" | "large";
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  sortFunction?: (data: any[], sortOptions: SortOptions[]) => any[];
  totalCount: number;
  patientData?: any;
}

const ControlledTable: React.FC<ControlledTableProps> = ({
  cellHeight = "",
  checkboxSelection = false,
  className,
  collapsible = false,
  columns,
  data,
  defaultSortOptions = [],
  expandOnRowClick = false,
  headerClassName,
  loading = false,
  rowsPerPageOptions: inputRowsPerPageOptions = [100],
  manualPagination = false,
  manualSort = false,
  onSetPage,
  onSetRowsPerPage,
  onRowClick,
  rowsPerPage: inputRowsPerPage = 0,
  sortFunction = lodashSort,
  totalCount,
  patientData,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(inputRowsPerPage);
  const [sortOptions, setSortOptions] =
    React.useState<TableSortOptions[]>(defaultSortOptions);
  const [selected, setSelected] = React.useState([]);

  const rowsPerPageOptions = React.useMemo(
    () =>
      inputRowsPerPageOptions
        .filter((option) => option !== inputRowsPerPage)
        .concat(inputRowsPerPage)
        .sort((a, b) => a - b),
    [inputRowsPerPage, inputRowsPerPageOptions]
  );

  const handleSetRowsPerPage = React.useCallback(
    (event) => {
      const newRowsPerPage = parseInt(event?.target.value, inputRowsPerPage);
      setRowsPerPage(newRowsPerPage);
      onSetRowsPerPage && onSetRowsPerPage(newRowsPerPage);

      setPage(0);
      onSetPage && onSetPage(0);
    },
    [inputRowsPerPage, onSetPage, setRowsPerPage, onSetRowsPerPage]
  );

  const handleSetPage = React.useCallback(
    (_, newPage) => {
      let target = { relation: "", url: "" };

      if (newPage > page) {
        target = patientData.find((link: any) => {
          return link.relation === "next";
        });
      } else {
        target = patientData.find((link: any) => {
          return link.relation === "previous";
        });
      }

      setPage(newPage);
      onSetPage && onSetPage(newPage);
    },
    [page, patientData]
  );

  const formattedSortOptions: SortOptions[] = React.useMemo(() => {
    return sortOptions.map((option) => {
      const { orderBy, order } = option;
      return {
        order,
        orderBy: (item) =>
          !item[orderBy]
            ? ""
            : typeof item[orderBy] === "string"
            ? item[orderBy]
            : item[orderBy].text,
      };
    });
  }, [sortOptions]);

  const sortedData = React.useMemo(() => {
    if (!data) return [];
    if (manualSort || !sortFunction) return data;
    return sortFunction(data, formattedSortOptions);
  }, [data, manualSort, formattedSortOptions, sortFunction]);

  React.useEffect(() => {
    if (sortedData.length < page * rowsPerPage) {
      const lastPage = Math.floor(sortedData.length / rowsPerPage);
      setPage(lastPage);
    }
  }, [page, rowsPerPage, setPage, sortedData.length]);

  const pageData = React.useMemo(() => {
    if (rowsPerPage && !manualPagination) {
      const dataLength = sortedData.length;
      const startIndex = page * rowsPerPage;
      const endIndex = (page + 1) * rowsPerPage;
      return sortedData.slice(
        startIndex,
        endIndex < dataLength ? endIndex : dataLength
      );
    }

    return sortedData;
  }, [page, rowsPerPage, sortedData, manualPagination]);

  return (
    <Box className={classes.tableRoot}>
      <Box className={classes.tableWrapper}>
        <TableContainer className={`${classes.tableContainer} ${className}`}>
          <Table
            stickyHeader
            aria-label="sticky table"
            size="small"
            className={classes.table}
          >
            <EnhancedTableHead
              collapsible={collapsible}
              columns={columns}
              checkboxSelection={checkboxSelection}
              className={headerClassName}
              numSelected={selected.length}
              rowCount={sortedData.length}
              sortOptions={sortOptions}
            />
            <TableBody>
              {pageData.map((row, index) => (
                <EnhancedTableRow
                  cellHeight={cellHeight}
                  columns={columns}
                  expandOnRowClick={expandOnRowClick}
                  index={index}
                  key={`table-row-${index}`}
                  onRowClick={onRowClick}
                  row={row}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box margin="auto" flexGrow={0} marginX={2}>
          {loading && <CircularProgress size={25} />}
        </Box>
        <Box flexGrow={1}>
          {rowsPerPage > 0 && (
            <>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleSetPage}
                onRowsPerPageChange={handleSetRowsPerPage}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export type TableColumns = TableColumnsType;
export type Order = OrderType;
export default ControlledTable;
