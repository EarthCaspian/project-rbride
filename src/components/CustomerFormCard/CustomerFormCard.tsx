import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { CustomerModel } from "../../models/requests/CustomerModel";
import {
  handleCustomerBirthdate,
  handleCustomerFirstName,
  handleCustomerLastName,
  handleCustomerInternationalId,
  handleCustomerLicenceIssueDate,
} from "../../store/customerSlice";
import DateChooserByYear from "../DateChooserByYear/DateChooserByYear";
import * as Yup from "yup";

type Props = {};

const initialValues: CustomerModel = {
  firstName: "",
  lastName: "",
  birthdate: "",
  internationalId: "",
  licenceIssueDate: "",
  userId: 1, // todo: to be implemented!!!
};

const CustomerFormCard = (props: Props) => {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const formRef = useRef(null);

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

  //Customer's information
  const [inputFirstName, setInputFirstName] = useState<string>("");
  const [inputLastName, setInputLastName] = useState<string>("");
  const [inputInternationalId, setInputInternationalId] = useState<string>("");

  useEffect(() => {
    dispatch(handleCustomerFirstName(inputFirstName));
    /* validationSchema.validate({
      firstname: inputFirstName, // todo: validation 
    })*/
  }, [inputFirstName, dispatch]);

  useEffect(() => {
    dispatch(handleCustomerLastName(inputLastName));
  }, [inputLastName, dispatch]);

  useEffect(() => {
    dispatch(handleCustomerInternationalId(inputInternationalId));
  }, [inputInternationalId, dispatch]);

  const handleBirthdate = (date: Date) => {
    const serializedBirthDate = date.toJSON();
    dispatch(handleCustomerBirthdate(serializedBirthDate));
  };

  const handleLicenceIssueDate = (date: Date) => {
    const serializedLicenceDate = date.toJSON();
    dispatch(handleCustomerLicenceIssueDate(serializedLicenceDate));
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  const validationSchema = Yup.object({
    // todo: validation
    firstName: Yup.string()
      .required("Please enter your firstname!")
      .min(2, "Please enter a valid firstname!")
      .max(30, "The firstname cannot exceed 30 characters!"),
    /*lastName: Yup.string()
    .required("Please enter your lastname!")
    .min(2, "Please enter a valid lastname!")
    .max(40, "The lastname cannot exceed 40 characters!"),
    internationalId: Yup.string()
    .required("Please enter your national id!")
    .min(11, "Please enter a valid national id!")
    .max(11, "The national id cannot exceed 11 characters!")
    .matches(/^\d+$/, "Please enter a valid national id with only numbers"),*/
  });

  const validate = () => {
    // todo: validation
    validationSchema.validate({
      firstname: inputFirstName,
    });
  };

  return (
    <div className="border border-secondary border-opacity-25 rounded py-2 ps-2 mb-4">
      <div className="border-bottom mb-3">
        <h3>Customer Information</h3>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}   // todo: validation
        // validateOnChange={true} // Trigger validation on change
        // validateOnBlur={true} // Trigger validation on blur
      >
        <Form
          onMouseEnter={() => {
            console.log("Mouse entered the form");
          }}
          onMouseLeave={() => {
            console.log("Mouse left the form");
          }}
        >
          <div className="container text-body-secondary">
            <div className="row">
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="firstName">Name*</label>
                <div>
                  <Field
                    id="firstName"
                    name="firstName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setInputFirstName(event.target.value);
                      //validate(event.target.value) // I want to show the warning message id the entered value is not validate. How can I do it?
                    }}
                    value={inputFirstName}
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
                    name="lastName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setInputLastName(event.target.value)
                    }
                    value={inputLastName}
                  />
                </div>
              </div>
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="internationalId">National Id*</label>
                <div>
                  <Field
                    id="internationalId"
                    name="internationalId"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setInputInternationalId(event.target.value)
                    }
                    value={inputInternationalId}
                  />
                </div>
              </div>
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="birthdate">Birthdate*</label>
                <div>
                  <DateChooserByYear
                    onDateChange={handleBirthdate}
                    selectedDate={new Date(initialValues.birthdate)}
                    minDate={minAllowedBirthdate}
                    maxDate={maxAllowedBirthdate}
                  />
                </div>
              </div>
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="licenceIssueDate">Licence Issue Date*</label>
                <div>
                  <DateChooserByYear
                    onDateChange={handleLicenceIssueDate}
                    selectedDate={new Date(initialValues.licenceIssueDate)}
                    minDate={minAllowedLicenceDate}
                    maxDate={maxAllowedLicenceDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CustomerFormCard;
