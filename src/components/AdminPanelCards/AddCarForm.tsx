import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CarService from '../../services/CarService';
import "./AddCarForm.css";

const AddCarSchema = Yup.object().shape({
    kilometer: Yup.number().required('Required'),
    plate: Yup.string().required('Required'),
    modelYear: Yup.number().required('Required'),
    dailyPrice: Yup.number().required('Required'),
    modelId: Yup.number().required('Required'),
    colorId: Yup.number().required('Required'),
    minFindeksRate: Yup.number().required('Required'),
    imagePath: Yup.string().required('Required')
});

export const AddCarForm = () => (
    <div>
        <h1>Add Car</h1>
        <Formik
            initialValues={{
                kilometer: 0,
                plate: '',
                modelYear: 0,
                dailyPrice: 0,
                modelId: 0,
                colorId: 0,
                minFindeksRate:0,
                imagePath: ''
            }}
            validationSchema={AddCarSchema}
            onSubmit={(values, { setSubmitting }) => {
                CarService.add(values)
                .then(() => {
                    setSubmitting(false);
                });
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-field form-control">
                        <label htmlFor="kilometer">Kilometer</label>
                        <Field type="number" name="kilometer" />
                        <ErrorMessage name="kilometer" component="div" className="error-message" />
                    </div>
                    <div className="form-field form-control">
                        <label htmlFor="plate">Plate</label>
                        <Field type="text" name="plate" />
                        <ErrorMessage name="plate" component="div" className='error-message' />
                    </div>
                    <div className="form-field form-control">
                        <label htmlFor="modelYear">Model Year</label>
                        <Field type="number" name="modelYear" />
                        <ErrorMessage name="modelYear" component="div" className='error-message' />
                    </div>
                    <div className="form-field form-control">
                        <label htmlFor="dailyPrice">Daily Price</label>
                        <Field type="number" name="dailyPrice" />
                        <ErrorMessage name="dailyPrice" component="div" className='error-message' />
                    </div>
                    <div className="form-field form-control">
                        <label htmlFor="modelId">Model ID</label>
                        <Field type="number" name="modelId" />
                        <ErrorMessage name="modelId" component="div" className='error-message' />
                    </div>
                    <div className="form-field form-control">
                        <label htmlFor="colorId">Color ID</label>
                        <Field type="number" name="colorId" />
                        <ErrorMessage name="colorId" component="div" className='error-message' />
                    </div>
                    <div className="form-field form-control">
                        <label htmlFor="minFindeksRate">minFindeksRate</label>
                        <Field type="number" name="minFindeksRate" />
                        <ErrorMessage name="minFindeksRate" component="div" className='error-message' />
                    </div>
                    <div className="form-field form-control">
                        <label htmlFor="imagePath">Image Path</label>
                        <Field type="text" name="imagePath" />
                        <ErrorMessage name="imagePath" component="div" className='error-message' />
                    </div>


                    <button type="submit" disabled={isSubmitting} className='btn btn-primary'>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);