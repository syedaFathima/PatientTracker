import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
} from "formik";
import Button from "@mui/material/Button";
import { useStyles } from "./styles";

/** Custom components to generate dynamic form */
export const Form = (props: any) => {
  return (
    <Formik {...props}>
      <FormikForm>{props.children}</FormikForm>
    </Formik>
  );
};

export const TextField = (props: any) => {
  const classes = useStyles();
  const { linkId, text, placeholder, ...rest } = props;
  return (
    <>
      {text && <label>{text}</label>}
      <Field
        type="text"
        name={linkId}
        {...rest}
        placeholder="Country"
        key={linkId}
        className={classes.field}
      />
      <ErrorMessage
        name={linkId}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
};

export const SelectField = (props: any) => {
  const classes = useStyles();
  const { linkId, text, option } = props;
  return (
    <>
      {text && <label>{text}</label>}
      <Field as="select" name={linkId} key={linkId} className={classes.field}>
        <option value="">Select</option>
        {option.map((optn: any, index: any) => (
          <option
            key={optn.valueCoding.code}
            value={optn.valueCoding.code}
            label={optn.valueCoding.display || optn.valueCoding.code}
          />
        ))}
      </Field>
      <ErrorMessage
        name={linkId}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
};

export const RadioField = (props: any) => {
  const classes = useStyles();
  const { linkId, text } = props;
  return (
    <>
      {text && <label>{text}</label>}
      <Field
        type="radio"
        name={linkId}
        value="Yes"
        key={`${linkId}T`}
        className={classes.radio}
      />
      Yes
      <Field type="radio" name={linkId} value="No" key={`${linkId}F`} />
      No
      <ErrorMessage
        name={linkId}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
};

export const DateField = (props: any) => {
  const classes = useStyles();
  const { linkId, text } = props;
  return (
    <>
      {text && <label>{text}</label>}
      <Field type="date" name={linkId} key={linkId} className={classes.field} />
      <ErrorMessage
        name={linkId}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
};

export const SubmitButton = (props: any) => {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <Button variant="contained" type="submit" {...rest} disabled={isSubmitting}>
      {title}
    </Button>
  );
};
