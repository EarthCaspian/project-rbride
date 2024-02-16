import { useEffect } from 'react';
import React , {useState} from 'react'
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { BrandModel } from '../../../models/response/BrandModel';
import BrandService from '../../../services/BrandService';

type Props = {}

const UpdateBrandSchema = Yup.object().shape({
    id:Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    logoPath: Yup.string().required('Required')
});

export interface UpdateBrandFormValues {
    id: number;
    name: string;
    logoPath: string;
  }

const UpdateBrandForm = (props: Props) => {

    const { id } = useParams<{ id: string }>();
    const [brand, setBrand] = useState<BrandModel | null>(null);
  
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (id) {
        const brandId = Number(id);
        BrandService.getById(brandId).then((response: AxiosResponse<BrandModel>) => {
          setBrand(response.data);
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
                id: brand? brand.id : '0',
                name: brand? brand.name : '',
                logoPath: brand? brand.logoPath : ''
            }as UpdateBrandFormValues}
            validationSchema={UpdateBrandSchema}
            onSubmit={(values:UpdateBrandFormValues, { setSubmitting }) => {
                BrandService.update(values)
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
  )
}

export default UpdateBrandForm