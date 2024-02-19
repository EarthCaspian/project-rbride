import { useEffect } from 'react';
import React , {useState} from 'react'
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ModelService from '../../../services/ModelService';
import { ModelModel } from '../../../models/response/ModelModel';

type Props = {}

const UpdateModelSchema = Yup.object().shape({
    id:Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    brandId: Yup.number().required('Required')
});

export interface UpdateModelFormValues {
    id: number;
    name: string;
    brandId: number;
  }

const UpdateModelForm = (props: Props) => {

    const { id } = useParams<{ id: string }>();
    const [model, setModel] = useState<ModelModel | null>(null);
  
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (id) {
        const modelId = Number(id);
        ModelService.getById(modelId).then((response: AxiosResponse<ModelModel>) => {
          setModel(response.data);
          setIsLoading(false);
        });
      }
    }, [id]);

    if(isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div>
        <h1>Update Brand</h1>
        <Formik
            initialValues={{
                id: model? model.id : '0',
                name: model? model.name : '',
                brandId: model? model.brand.id : '0'
            }as UpdateModelFormValues}
            validationSchema={UpdateModelSchema}
            onSubmit={(values:UpdateModelFormValues, { setSubmitting }) => {
                ModelService.update(values)
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
  )
}

export default UpdateModelForm