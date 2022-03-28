import { makeStyles } from "@material-ui/core";
import { Height } from "@material-ui/icons";

export const useStyles = makeStyles(() => ({
  body: {
    // height: "100%",
    // width: "100%",
    // padding: "10px",
    // paddingBottom: "15px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  title: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  fields: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    margin: "20px",
    alignItems: "center",
  },
}));
