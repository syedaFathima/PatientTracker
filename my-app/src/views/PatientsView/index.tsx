import * as React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Paper, Box, Modal } from "@material-ui/core";
import Button from "@mui/material/Button";

import { useStyles } from "./styles";
import axios from "axios";
import PatientsTable from "./PatientsTable";
import { getResponseTime } from "../../utils/patientHelper";
import Questionnaire from "../Questionnaire";
export interface PatientViewProps {
  searchLabel?: string;
  scrollable?: boolean;
}
const PatientsView: React.FC<PatientViewProps> = ({}) => {
  const classes = useStyles();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [searchFilter, setSearchFilter] = React.useState("");
  const [data, setData] = React.useState<any>([]);
  const [timer, setTimer] = React.useState("");
  const [modal, setModal] = React.useState<boolean>(false);
  const searchSchema = Yup.object().shape({
    firstName: Yup.string().matches(
      /^[A-Za-z ]*$/,
      "Please enter valid First Name"
    ),
    lastName: Yup.string().matches(
      /^[A-Za-z ]*$/,
      "Please enter valid Last Name"
    ),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
  };

  /** search patient on submit - first name and last name */
  const searchPatient = React.useCallback((searchInput) => {
    const searchParams: string[] = [];
    let URIParams = "";

    if (searchInput.firstName) {
      searchParams.push(`given=${searchInput.firstName}`);
    }

    if (searchInput.lastName) {
      searchParams.push(`family=${searchInput.lastName}`);
    }

    if (searchParams.length > 0) {
      URIParams =
        searchParams.length > 1
          ? searchParams.join("&")
          : searchParams.join("");
    }
    getPatientSearch(URIParams);
  }, []);

  /** API call for search */
  const getPatientSearch = React.useCallback((URIParams) => {
    const startTime = Date.now();
    axios
      .get(
        `https://try.smilecdr.com/baseR4/Patient?_sort=given,family,birthdate&_count=100&${URIParams}`
      )
      .then((res) => {
        setTimer(getResponseTime(startTime));
        setSearchFilter(res.data);
      });
  }, []);

  const reset = React.useCallback((values) => {
    getPatientSearch("");
  }, []);

  const openQuestionnaire = () => {
    setModal(true);
  };

  const closeQuestionnaire = () => {
    setModal(false);
  };

  /** Get Questionnaire data from form in the Modal */
  const childToParent = React.useCallback(
    (questionnaireData: any) => {
      setData(questionnaireData);
      setModal(false);
    },
    [data]
  );

  return (
    <>
      <Box className={classes.body}>
        <Paper className={classes.paper}>
          <Box className={classes.container}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => searchPatient(values)}
              onReset={(values) => reset(values)}
              validationSchema={searchSchema}
            >
              {({ errors, touched }) => (
                <Form className={classes.form}>
                  <Box className={classes.searchForm}>
                    <label>First Name: </label>
                    <Box className={classes.searchBox}>
                      <Field
                        type="text"
                        name="firstName"
                        className={classes.field}
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className={classes.errorMsg}>
                          {errors.firstName}
                        </div>
                      ) : null}
                    </Box>
                    <Box>
                      <label>Last Name: </label>

                      <Field
                        type="text"
                        name="lastName"
                        className={classes.field}
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className={classes.errorMsg}>
                          {errors.lastName}
                        </div>
                      ) : null}
                    </Box>
                    <Box className={classes.actionContainer}>
                      <Button type="submit" variant="contained">
                        Submit
                      </Button>

                      <Button type="reset" variant="outlined">
                        Reset
                      </Button>
                    </Box>
                  </Box>
                  <Box className={classes.QuestionnaireButton}>
                    <Button variant="contained" onClick={openQuestionnaire}>
                      Questionnaire
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <Box>
            <PatientsTable
              search={searchFilter}
              searchTime={timer}
              list={data}
            />
          </Box>
        </Paper>
        {modal && (
          <Modal
            open={modal}
            onClose={closeQuestionnaire}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Questionnaire
                onClose={() => setModal(false)}
                childToParent={childToParent}
              />
            </Box>
          </Modal>
        )}
      </Box>
      <Box className={classes.formData}>
        {data &&
          data?.map((item: any) => (
            <ul key={item.linkId.toString()}>
              {`${item.text} `}
              <b>{item.value}</b>
            </ul>
          ))}
      </Box>
    </>
  );
};

export default PatientsView;
