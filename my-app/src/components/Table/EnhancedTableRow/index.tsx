import React from "react";
import { Box, TableCell, TableRow, Typography } from "@material-ui/core";
import { TableColumns } from "../EnhancedTableHead";
import { useStyles } from "./styles";

type TableDataProperty = {
  text: string;
  loading?: boolean;
  component: React.ReactElement;
};

export type TableRowData = {
  id: string;
  [key: string | number]: any | TableDataProperty;
};

interface EnhancedTableRowProps {
  cellHeight?: number | string;
  columns: TableColumns[];
  expandOnRowClick?: boolean;
  index: number;
  onRowClick?: (event: React.MouseEvent, data: any) => void;
  row: TableRowData;
}

const EnhancedTableRow: React.FC<EnhancedTableRowProps> = ({
  cellHeight = "",
  columns,
  index,
  row,
}) => {
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.row}>
        {columns.map((column) => {
          const value = row[column.id] ?? "";
          return (
            <TableCell
              key={`table-cell-${index}-${column.id}`}
              className={classes.cell}
              align={column.alignContent || column.align || "left"}
              height={cellHeight}
            >
              <>
                <Box className={classes.cellContent}>
                  {typeof value === "string" ? (
                    <Typography variant="body2" className={classes.cellText}>
                      {value}
                    </Typography>
                  ) : (
                    <Box className={classes.cellComponent}>
                      {value?.component}
                    </Box>
                  )}
                </Box>
              </>
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

export default EnhancedTableRow;
