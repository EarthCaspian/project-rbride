import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { CustomerStateModel } from "../../../store/customerSlice";
import DateChooserField from "../../DateChooserByYear/DateChooserByYear";
import { initialValues, maxAllowedBirthdate, maxAllowedLicenceDate, minAllowedBirthdate, minAllowedLicenceDate, updateCustomerState, updateInvoiceState, validationSchema } from "./helpers";
import { RootState } from "../../../store/configureStore";
import { useNavigate } from "react-router-dom";

type Props = {};

const CustomerFormCard = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rentalState = useSelector((state: RootState) => state.rental);
  const isLoggedIn = useSelector((state : RootState) => state.login.isLoggedIn);


  // Handle form submission
  const handleSubmit = (values : CustomerStateModel) => {
    if (isLoggedIn) {
      updateCustomerState(values, dispatch);
      updateInvoiceState(dispatch, rentalState);
    }
    else
      navigate("/login");
  };

  return (
    <div className="border border-secondary border-opacity-25 rounded py-2 ps-2 mb-4">
      <div className="border-bottom mb-3">
        <h3>Customer Information</h3>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: CustomerStateModel) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <Form
          id="customer-form"
        >
          <div className="container text-body-secondary">
            <div className="row">
              <div className="col col-lg-6 fw-bold mb-2">
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

              <div className="col col-lg-6 fw-bold mb-2">
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
              <div className="col col-lg-6 fw-bold mb-2">
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
              <div className="col col-lg-6  fw-bold mb-2">
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
              <div className="col col-lg-6 fw-bold mb-2">
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
