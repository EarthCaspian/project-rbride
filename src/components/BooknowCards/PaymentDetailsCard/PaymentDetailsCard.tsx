import { Field, Form, Formik } from "formik";
import React from "react";
import HoverImage from "./HoverImage";

type Props = {};

interface BookingInformation {}

const initialValues: BookingInformation = {};

const PaymentDetailsCard = (props: Props) => {
  return (
    <div className="border border-secondary border-opacity-25 rounded py-2 ps-2 mb-4">
      <div className="border-bottom mb-3">
        <h3>Payment Information</h3>
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
              <div className="col col-md-8 fw-bold mb-2">
                <label htmlFor="firstName">Card Number*</label>
                <div>
                  <Field
                    id="firstName"
                    name="firstName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                  />
                </div>
                <label htmlFor="firstName">Name on the Card*</label>
                <div>
                  <Field
                    id="firstName"
                    name="firstName"
                    className="formLabel border border-secondary border-opacity-25"
                    placeholder=""
                  />
                </div>
                <div className="">
                  <div className="col col-md-6 me-1 pe-1">
                    <label htmlFor="firstName">Expire Date*</label>
                    <div>
                      <Field
                        id="firstName"
                        name="firstName"
                        className="formLabel border border-secondary border-opacity-25"
                        placeholder="  __ /__"
                      />
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <label htmlFor="firstName">CVC Security Code*</label>
                    <div>
                      <Field
                        id="firstName"
                        name="firstName"
                        className="formLabel border border-secondary border-opacity-25"
                        placeholder="  ***"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4 fw-bold mb-2">
                <div>
                  <HoverImage
                    normalSrc="/assets/creditCard.png"
                    hoverSrc="/assets/creditCard2.png"
                    alt="Credit Card"
                  />
                </div>
              </div>

              <div className="col-12 fw-bold mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label">
                    I have read and accept Rental Agreement.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PaymentDetailsCard;
