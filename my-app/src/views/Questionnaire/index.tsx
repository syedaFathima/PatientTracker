import * as React from "react";
import * as Yup from "yup";
import _ from "lodash";

import { Box, Button, IconButton, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
  RadioField,
  DateField,
} from "../../components/FormikComponents";
import QuestionnaireData from "../../assets/questionnaire.json";
import { Clear } from "@material-ui/icons";
import PollIcon from "@mui/icons-material/Poll";

type QuestionnaireProps = { childToParent: any; onClose: (event: any) => void };
const Questionnaire: React.FC<QuestionnaireProps> = ({
  childToParent,
  onClose,
}) => {
  const classes = useStyles();
  const formFieldsData: { [key: string]: any } = QuestionnaireData.item;
  const [formData, setFormData] = React.useState({});
  const [validationSchema, setValidationSchema] = React.useState({});

  React.useEffect(() => {
    initializeQuestionnaire(formFieldsData);
  }, []);

  /** Define Validations */
  const initializeQuestionnaire = (questionnaireSchema: any) => {
    let formData: { [key: string]: {} } = {};
    let _validationSchema: { [key: string]: any } = {};

    for (var question of questionnaireSchema) {
      // questionnaireSchema.map((question: any, index: any) => {
      formData[question.linkId] = "";

      switch (question.type) {
        case "string":
          _validationSchema[question.linkId] = Yup.string();
          break;
        case "choice":
          _validationSchema[question.linkId] = Yup.string().oneOf(
            question.option.map((o: any) => o.valueCoding.code)
          );
          break;
        case "boolean":
          _validationSchema[question.linkId] = Yup.string();
          break;
        case "date":
          _validationSchema[question.linkId] = Yup.string();
          break;
      }
      if (_validationSchema[question.linkId]) {
        _validationSchema[question.linkId] = _validationSchema[
          question.linkId
        ].required("This is a required field");
      }
    }

    console.log(_validationSchema);

    setFormData(formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  /** Generate Dynamic form */
  const getFormElement = (element: any) => {
    const props = {
      linkId: element.linkId,
      text: element.text,
      option: element.option,
    };

    let field;

    switch (element.type) {
      case "string":
        field = <TextField {...props} />;
        break;
      case "choice":
        field = <SelectField {...props} />;
        break;
      case "boolean":
        field = <RadioField {...props} />;
        break;
      case "date":
        field = <DateField {...props} />;
        break;
    }

    return field;
  };

  /** Get Display value for select */
  const getDisplayValue = (value: string, options: any) => {
    const oMappedValue = options.filter(
      (option: any) => value === option.valueCoding.code
    )[0];

    return oMappedValue.valueCoding.display;
  };

  /** Submit Questionnaire */
  function handleSubmit(values: any) {
    console.log({ values });
    const jsonData = formFieldsData.map((field: any) => {
      let oResponse = {
        text: field.text,
        linkId: field.linkId,
        value: values[field.linkId],
      };

      if (field.type === "choice") {
        oResponse.value = getDisplayValue(oResponse.value, field.option);
      }
      return oResponse;
    });

    console.log(jsonData);
    childToParent(jsonData);
  }
  return (
    <>
      <Box className={classes.body}>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <Clear />
        </IconButton>
        <Box>
          <Typography variant="h5" className={classes.title}>
            <PollIcon /> Questionnaire
          </Typography>
        </Box>
        <Box className={classes.form}>
          <Form
            enableReinitialize
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formFieldsData.map((element: any) => (
              <div key={element.linkId} className={classes.fields}>
                {getFormElement(element)}
              </div>
            ))}
            <SubmitButton title="Submit" />
          </Form>
        </Box>
      </Box>
    </>
  );
};
export default Questionnaire;
