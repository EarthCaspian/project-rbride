import React from "react";
import "./style.css";
import { Field, Formik, Form } from "formik";

type Props = {};

interface BookingInformation {}

const initialValues: BookingInformation = {};

const InvoiceInformationCard = (props: Props) => {
  return (
    <div className="border border-secondary border-opacity-25 rounded py-2 ps-2 mb-4">
      <div className="border-bottom mb-3">
        <h3>Invoice Information</h3>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
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
                  />
                </div>
              </div>
              <div className="col-6 fw-bold mb-2">
                <label htmlFor="firstName">Surname*</label>
                <div>
                  <Field
                    id="firstName"
                    name="firstName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                  />
                </div>
              </div>
              
              <div className="col-12 fw-bold mb-2">
                <label htmlFor="firstName">International Id*</label>
                <div>
                  <Field
                    name="firstName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="col-12 fw-bold mb-2">
                <label htmlFor="firstName">Address*</label>
                <div>
                  <Field
                    name="firstName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                    style={{height: "100px"}}
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

export default InvoiceInformationCard;
