import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  headCell: {
    textTransform: "uppercase",
    fontSize: "0.65rem",
    fontWeight: 400,
    backgroundColor: "inherit",
  },
  headContainer: {
    display: "flex",
  },
  headerText: {
    flexGrow: 1,
  },
  sortLabel: {
    "&:hover": {
      color: "inherit",
    },
    "&:focus": {
      color: "grey",
    },
    "&.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon":
      {
        color: "blue",
      },
  },
  collapsePadding: {
    width: 30,
    marginRight: "10px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
