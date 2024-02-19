import { useEffect } from 'react';
import React , {useState} from 'react'
import { useParams } from 'react-router-dom';
import CarService from '../../../services/CarService';
import { AxiosResponse } from 'axios';
import { CarModel } from '../../../models/response/CarModel';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


type Props = {}

const UpdateCarSchema = Yup.object().shape({
    id: Yup.number().required('Required'),
    kilometer: Yup.number().required('Required'),
    plate: Yup.string().required('Required'),
    modelYear: Yup.number().required('Required'),
    dailyPrice: Yup.number().required('Required'),
    modelId: Yup.number().required('Required'),
    colorId: Yup.number().required('Required'),
    minFindeksRate: Yup.number().required('Required'),
    imagePath: Yup.string().required('Required')
});


export interface UpdateCarFormValues {
    id: number;
    kilometer: number;
    plate: string;
    modelYear: number;
    dailyPrice: number;
    modelId: number;
    colorId: number;
    minFindeksRate: number;
    imagePath: string;
  }

const UpdateCarForm = (props: Props) => {

    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<CarModel | null>(null);
  
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (id) {
        const carId = Number(id);
        CarService.getById(carId).then((response: AxiosResponse<CarModel>) => {
          setCar(response.data);
          setIsLoading(false);
        });
      }
    }, [id]);

    if(isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div>
        <Formik
        initialValues={{
            id: car ? car.id : 0,
            kilometer: car ? car.kilometer : 0,
            plate: car ? car.plate : '',
            modelYear: car ? car.modelYear : 0,
            dailyPrice: car ? car.dailyPrice : 0,
            modelId: car && car.model ? car.model.id : 0,
            colorId: car && car.color ? car.color.id : 0,
            minFindeksRate: car ? car.minFindeksRate : 0,
            imagePath: car ? car.imagePath : ''
          } as UpdateCarFormValues}
          validationSchema={UpdateCarSchema}
          onSubmit={(values: UpdateCarFormValues, { setSubmitting }) => {
            CarService.update(values)
            .then((response) => {
              setSubmitting(false);
              toast.success(response.data.message); 
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
  )
}

export default UpdateCarForm