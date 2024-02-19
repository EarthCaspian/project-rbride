import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import { JoinUsModel } from '../../models/requests/JoinUsModel';
import { sendEmail } from '../../services/JoinUsService';
import "./joinus.css";

const JoinUs: React.FC = () => {

    const [capVal, setCapVal] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    const initialValues: JoinUsModel = {
        name: '',
        surname: '',
        email: '',
        phone: '',
        message: ''
    };

    const handleSubmit = async (values: JoinUsModel) => {
        try {
            setSubmitting(true);
            if (capVal) {
                // Send the data to backend
                const response = await sendEmail(values);
                if (response.success) {
                    console.log('Mail sent successfully');
                    setSubmitSuccess(true);
                    setSubmitError('');
                    // Handle successful submission, e.g., show a success message
                } else {
                    console.error('Failed to send mail');
                    setSubmitSuccess(false);
                    setSubmitError(response.error || 'Failed to send mail');
                    // Handle failed submission, e.g., show an error message
                }
            } else {
                console.error('reCAPTCHA not validated');
                setSubmitSuccess(false);
                setSubmitError('reCAPTCHA not validated');
                // Handle case when reCAPTCHA is not validated
            }
        } catch (error) {
            console.error('Error sending mail:', error);
            setSubmitSuccess(false);
            setSubmitError('Error sending mail');
            // Handle error, e.g., show an error message
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="join-us row">
            <div className="offset-xl-1 col-xl-10 col-lg-13 col-24">
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Please enter your name'),
                        surname: Yup.string().required('Please enter your surname'),
                        email: Yup.string().email('Please enter a valid email address').required('Email address is required'),
                        phone: Yup.string().required('Please enter your phone number'),
                        message: Yup.string().required('Please enter your message'),
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form className="primary-form">
                        <h4 className="form-title mb-5">Join Us</h4>
                        <div className="row" data-recording-disable="">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="name" className="field-desc">Name *</label>
                                    <Field className="form-control required onlyLetters" type="text" id="name" name="name" />
                                    <ErrorMessage name="name" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="surname" className="field-desc">Surname *</label>
                                    <Field className="form-control required onlyLetters" type="text" id="surname" name="surname" />
                                    <ErrorMessage name="surname" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="email" className="field-desc">Email *</label>
                                    <Field className="form-control required email" type="email" id="email" name="email" />
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="phone" className="field-desc">Phone *</label>
                                    <Field className="form-control required" type="text" id="phone" name="phone" />
                                    <ErrorMessage name="phone" />
                                </div>
                            </div>
                            <div className="col-md-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="message" className="field-desc">Message *</label>
                                    <Field as="textarea" className="form-control required" name="message" id="message" />
                                    <ErrorMessage name="message" />
                                </div>
                            </div>
                        </div>
                        <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''} onChange={(val) => setCapVal(val)}/>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" disabled={!capVal || submitting}>
                                {submitting ? 'Sending...' : 'Submit'}</button>
                        </div>
                        {submitSuccess && <div className="alert alert-success mt-3">Form submitted successfully.</div>}
                        {submitError && <div className="alert alert-danger mt-3">{submitError}</div>}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default JoinUs;