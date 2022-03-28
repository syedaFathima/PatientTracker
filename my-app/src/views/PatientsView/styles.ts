import { makeStyles } from "@material-ui/core";
import Questionnaire from "../Questionnaire/index";

export const useStyles = makeStyles(() => ({
  body: {
    height: "100%",
    width: "100%",
    padding: "10px",
    paddingBottom: "15px",
  },
  paper: {
    width: "100%",
    height: "100%",
  },
  form: {
    width: "97%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    margin: "10px 20px",
  },
  searchForm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  },
  QuestionnaireButton: {
    marginLeft: "auto",
  },
  searchBox: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    height: "30px",
    border: "1px solid #1976d2",
    borderRadius: "4px",
  },
  errorMsg: {
    color: "#FF5733",
  },
  formData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  actionContainer: {
    display: "flex",
    justifySelf: "flex-end",
    gap: "20px",
  },
}));
