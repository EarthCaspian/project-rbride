import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import "./Contact.css";
import { sendEmail } from '../../services/ContactService';
import { ContactModel } from '../../models/requests/ContactModel';
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm: React.FC = () => {

    const [capVal, setCapVal] = useState<string | null>(null);
    
    const initialValues: ContactModel = {
        subject: '',
        name: '',
        surname: '',
        email: '',
        message: ''
    };

    const handleSubmit = async (values: ContactModel) => {
        try {
            if (capVal) {
                // Send the data to backend
                const response = await sendEmail(values);
                if (response.success) {
                    console.log('Mail sent successfully');
                    // Handle successful submission, e.g., show a success message
                } else {
                    console.error('Failed to send mail');
                    // Handle failed submission, e.g., show an error message
                }
            } else {
                console.error('reCAPTCHA not validated');
                // Handle case when reCAPTCHA is not validated
            }
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error, e.g., show an error message
        }
    };


    return (
        <div className="row">
            <div className="col-xl-13 col-lg-11 col-24">
                <div className="map-card">
                    <div className="contact-item">
                        <h4 className="company">TOBETO</h4>
                        <p className="desc"><strong>Adres: </strong> Kavacık, Rüzgarlıbahçe Mah. Çampınarı Sok. No:4 Smart Plaza B Blok Kat:3 34805, Beykoz/İstanbul</p>
                        <p className="phone"><strong>Telefon: </strong>(0216) 331 48 00</p>
                        <p className="mail"><strong>E-Posta: </strong>info@tobeto.com</p>
                    </div>
                    <div className="map-item">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12028.132037675927!2d29.0957136!3d41.0901254!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab65635b94473%3A0x688e9b2eaf799804!2sEnocta%20%C4%B0stanbul%20Ofisi!5e0!3m2!1str!2str!4v1707914323496!5m2!1str!2str" width="100%" height="250px" style={{ border: 0 }} aria-hidden="false" tabIndex={0}></iframe>
                    </div>
                </div>
            </div>
            <div className="offset-xl-1 col-xl-10 col-lg-13 col-24">
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        subject: Yup.string().required('Subject selection is required'),
                        name: Yup.string().required('Please enter your name'),
                        surname: Yup.string().required('Please enter your surname'),
                        email: Yup.string().email('Please enter a valid email address').required('Email address is required'),
                        message: Yup.string().required('Please enter your message'),
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form className="primary-form">
                        <h4 className="form-title mb-5">Bize Ulaşın</h4>
                        <div className="row" data-recording-disable="">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="name" className="field-desc">Adınız *</label>
                                    <Field className="form-control required onlyLetters" type="text" id="name" name="name" />
                                    <ErrorMessage name="name" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="surname" className="field-desc">Soyadınız *</label>
                                    <Field className="form-control required onlyLetters" type="text" id="surname" name="surname" />
                                    <ErrorMessage name="surname" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="email" className="field-desc">E-Posta *</label>
                                    <Field className="form-control required email" type="email" id="email" name="email" />
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="subject" className="field-desc">Konu *</label>
                                    <Field as="select" name="subject" id="subject" className="form-control primary-select2 required select2-hidden-accessible">
                                        <option value="">Seçiniz</option>
                                        <option value="Öneri">Öneri</option>
                                        <option value="Teşekkür">Teşekkür</option>
                                        <option value="Eleştiri">Eleştiri</option>
                                        <option value="Talep">Talep</option>
                                    </Field>
                                    <ErrorMessage name="subject" />
                                </div>
                            </div>
                            <div className="col-md-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="message" className="field-desc">Mesajınız *</label>
                                    <Field as="textarea" className="form-control required" name="message" id="message" />
                                    <ErrorMessage name="message" />
                                </div>
                            </div>
                        </div>
                        <ReCAPTCHA sitekey="" onChange={(val) => setCapVal(val)}/>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" disabled={!capVal}>Gönder</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default ContactForm;