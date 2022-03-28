import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  tableRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "10px",
  },
  tableWrapper: {
    height: "calc(100% - 62px)",
  },
  tableContainer: {
    height: "100%",
    scrollbarColor: "grey",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: 7,
      height: 7,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: 5,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "grey",
    },
  },
  table: {
    tableLayout: "fixed",
  },
  cell: {
    fontWeight: 400,
    color: "grey",
    verticalAlign: "middle",
    textOverflow: "ellipsis",
    "&.MuiTableCell-root": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));
