import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  tabBody: {
    padding: "10px",
    height: "calc(100vh - 330px)",
  },
  headerCell: {
    backgroundColor: "white",
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
}));
