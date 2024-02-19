import React from "react";
import { useDispatch } from "react-redux";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  handleCustomerBirthdate,
  handleCustomerFirstName,
  handleCustomerLastName,
  handleCustomerInternationalId,
  handleCustomerLicenceIssueDate,
  setCustomerIsValid,
  CustomerStateModel,
} from "../../store/customerSlice";
import DateChooserField from "../DateChooserByYear/DateChooserByYear";
import * as Yup from "yup";

type Props = {};

const initialValues: CustomerStateModel = {
  firstName: "",
  lastName: "",
  birthdate: "",
  internationalId: "",
  licenceIssueDate: "",
};

const CustomerFormCard = (props: Props) => {
  const currentDate = new Date();
  const dispatch = useDispatch();

  //  Customer cannot be under 18 years of age
  const maxAllowedBirthdate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minAllowedBirthdate = new Date(
    maxAllowedBirthdate.getFullYear() - 90,
    maxAllowedBirthdate.getMonth(),
    maxAllowedBirthdate.getDate()
  );

  //  Customer cannot have less than 2 years experience
  const minAllowedLicenceDate = new Date(
    currentDate.getFullYear() - 10,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const maxAllowedLicenceDate = new Date(
    currentDate.getFullYear() - 2,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Handle form submission
  const handleSubmit = (values : CustomerStateModel) => {
    dispatch(handleCustomerFirstName(values.firstName));
    dispatch(handleCustomerLastName(values.lastName));
    dispatch(handleCustomerInternationalId(values.internationalId));
    if (values.birthdate)
      dispatch(handleCustomerBirthdate(values.birthdate));
    if (values.licenceIssueDate)
      dispatch(handleCustomerLicenceIssueDate(values.licenceIssueDate));
    dispatch(setCustomerIsValid(true));
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Please enter your firstname!")
      .min(2, "Please enter a valid firstname!")
      .max(30, "The firstname cannot exceed 30 characters!"),
    lastName: Yup.string()
      .required("Please enter your lastname!")
      .min(2, "Please enter a valid lastname!")
      .max(40, "The lastname cannot exceed 40 characters!"),
    birthdate: Yup.date()
      .required("Please enter your birthdate!"),
    internationalId: Yup.string()
      .required("Please enter your national id!")
      .min(11, "Please enter a valid national id!")
      .max(11, "The national id cannot exceed 11 characters!")
      .matches(/^\d+$/, "Please enter a valid national id with only numbers"),
    licenceIssueDate: Yup.date()
      .required("Please enter yout licence issue date!"),
  });

  return (
    <div className="border border-secondary border-opacity-25 rounded py-2 ps-2 mb-4">
      <div className="border-bottom mb-3">
        <h3>Customer Information</h3>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: CustomerStateModel) => handleSubmit(values)}
        validationSchema={validationSchema}
        // validateOnChange={true} // Trigger validation on change
        // validateOnBlur={true} // Trigger validation on blur
      >
        <Form
          id="customer-form"
          // onMouseEnter={() => {
          //   console.log("Mouse entered the form");
          // }}
          // onMouseLeave={() => {
          //   console.log("Mouse left the form");
          // }}
        >
          <div className="container text-body-secondary">
            <div className="row">
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="firstName">Name*</label>
                <div>
                  <Field
                    id="firstName"
                    as="input"
                    type="text"
                    name="firstName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                  />

                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="col-6 fw-bold mb-2">
                <label htmlFor="lastName">Surname*</label>
                <div>
                  <Field
                    id="lastName"
                    as="input"
                    name="lastName"
                    type="text"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="internationalId">National Id*</label>
                <div>
                  <Field
                    id="internationalId"
                    as="input"
                    name="internationalId"
                    type="text"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                  />
                  <ErrorMessage
                    name="internationalId"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="birthdate">Birthdate*</label>
                <div>
                  <Field
                    name="birthdate"
                    component={DateChooserField}
                    minDate={minAllowedBirthdate}
                    maxDate={maxAllowedBirthdate}
                  />
                  <ErrorMessage
                    name="birthdate"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="licenceIssueDate">Licence Issue Date*</label>
                <Field
                    name="licenceIssueDate"
                    component={DateChooserField}
                    minDate={minAllowedLicenceDate}
                    maxDate={maxAllowedLicenceDate}
                  />
                  <ErrorMessage
                    name="licenceIssueDate"
                    component="div"
                    className="text-danger"
                  />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      </div>
  );
};

export default CustomerFormCard;
