import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  row: {
    wordBreak: "break-word",
  },
  cell: {
    fontWeight: 400,
    color: "black",
    verticalAlign: "middle",
    textOverflow: "ellipsis",
    "&.MuiTableCell-root": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  cellContent: {
    display: "flex",
    alignItems: "center",
  },
  cellText: { fontWeight: 400 },
  cellComponent: { flexGrow: 1 },
}));
