import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../AddForm.css";
import ModelService from '../../../services/ModelService';
import { toast } from 'react-toastify';

const AddModelSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    brandId: Yup.number().required('Required')
});

export const AddModelForm = () => (
    <div>
        <h1>Add Model</h1>
        <Formik
            initialValues={{
                name: '',
                brandId: 0
            }}
            validationSchema={AddModelSchema}
            onSubmit={(values, { setSubmitting }) => {
                ModelService.add(values)
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
                        <label htmlFor="brandId">Brand ID</label>
                        <Field type="text" name="brandId" />
                        <ErrorMessage name="brandId" component="div" className='error-message' />
                    </div>


                    <button type="submit" disabled={isSubmitting} className='btn btn-primary'>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);