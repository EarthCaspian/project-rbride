import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BrandService from '../../../services/BrandService';
import "../AddForm.css";
import { toast } from 'react-toastify';

const AddBrandSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    logoPath: Yup.string().required('Required')
});

export const AddBrandForm = () => (
    <div>
        <h1>Add Brand</h1>
        <p>Enter the required brand information to add a car brand to the database. 
            Please refer to the valid entry requirement warnings in the form for correct data entry.</p>
        <Formik
            initialValues={{
                name: '',
                logoPath: ''
            }}
            validationSchema={AddBrandSchema}
            onSubmit={(values, { setSubmitting }) => {
                BrandService.add(values)
                .then((response) => {
                    setSubmitting(false);
                    toast.success(response.data.message); 
                });
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    
                    <div className="form-field form-control">
                        <label htmlFor="name">Name</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" className='error-message' />
                    </div>
                    
                    <div className="form-field form-control">
                        <label htmlFor="logoPath">Logo Path</label>
                        <Field type="text" name="logoPath" />
                        <ErrorMessage name="logoPath" component="div" className='error-message' />
                    </div>


                    <button type="submit" disabled={isSubmitting} className='btn btn-primary'>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);