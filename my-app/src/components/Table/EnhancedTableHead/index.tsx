import React from "react";
import {
  TableCell,
  TableRow,
  TableHead,
  TableSortLabel,
  Box,
} from "@material-ui/core";
import { useStyles } from "./styles";

import { SortOptions } from "../../../utils/patientHelper";

export type TableColumns = {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  alignContent?: "inherit" | "left" | "center" | "right" | "justify";
  hideHeader?: boolean;
  iconPadding?: number;
  iconPaddingSize?: number;
  id: string;
  label?: string;
  size?: number | string;
  sortable?: boolean;
};

export type Order = "asc" | "desc";

interface EnhancedTableHeadProps {
  checkboxSelection?: boolean;
  className?: string;
  collapsible?: boolean;
  columns: TableColumns[];
  onRequestSort?: (event: React.MouseEvent, property: keyof any) => void;
  onSelectAllClick?: (event: React.MouseEvent) => void;
  numSelected: number;
  rowCount: number;
  sortOptions: SortOptions[];
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
  className,
  collapsible = false,
  columns,
  onRequestSort,
  sortOptions,
}) => {
  const classes = useStyles();

  const createSortHandler = React.useCallback(
    (property) => (event: any) =>
      onRequestSort && onRequestSort(event, property),
    [onRequestSort]
  );

  const getSortOrder = React.useCallback(
    (property) =>
      sortOptions.find((option) => option.orderBy === property)?.order || false,
    [sortOptions]
  );

  const getSortActive = React.useCallback(
    (property) => !!sortOptions.find((option) => option.orderBy === property),
    [sortOptions]
  );

  return (
    <TableHead>
      <TableRow>
        {columns.map((column, columnIndex) => (
          <TableCell
            key={column.id}
            align={column.align || "left"}
            sortDirection={getSortOrder(column.id)}
            className={`${classes.headCell} ${className}`}
            width={column.size}
          >
            <Box className={classes.headContainer}>
              {collapsible && columnIndex === 0 && (
                <Box className={classes.collapsePadding} />
              )}
              {column.align !== "right" && column.iconPadding && (
                <Box
                  width={(column.iconPaddingSize || 28) * column.iconPadding}
                />
              )}
              {column.sortable ? (
                <TableSortLabel
                  active={getSortActive(column.id)}
                  direction={getSortOrder(column.id) || "asc"}
                  onClick={createSortHandler(column.id)}
                  className={classes.sortLabel}
                >
                  {!column.hideHeader && (column.label || column.id)}
                  {getSortActive(column.id) ? (
                    <span className={classes.visuallyHidden}>
                      {getSortOrder(column.id) === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : (
                <Box className={classes.headerText}>
                  {!column.hideHeader && (column.label || column.id)}
                </Box>
              )}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
