import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.module.css';
import { Link } from 'react-router-dom';

type Props = {};

const Register = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      registerEmail: '',
      registerPassword: '',
    },
    validationSchema: Yup.object({
      registerEmail: Yup.string().email('Invalid email address').required('Email is required'),
      registerPassword: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <main className="form-signin text-center">
      <form onSubmit={formik.handleSubmit}>
        <img className="mb-4" src={process.env.PUBLIC_URL + "/images/roboride.jpeg"} alt="" width="72" height="80" />
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${formik.touched.registerEmail && formik.errors.registerEmail ? 'is-invalid' : ''}`}
            id="registerEmail"
            placeholder="Email"
            {...formik.getFieldProps('registerEmail')}
          />
          <label htmlFor="registerEmail">Email</label>
          {formik.touched.registerEmail && formik.errors.registerEmail && (
            <div className="invalid-feedback">{formik.errors.registerEmail}</div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${formik.touched.registerPassword && formik.errors.registerPassword ? 'is-invalid' : ''}`}
            id="registerPassword"
            placeholder="Password"
            {...formik.getFieldProps('registerPassword')}
          />
          <label htmlFor="registerPassword">Password</label>
          {formik.touched.registerPassword && formik.errors.registerPassword && (
            <div className="invalid-feedback">{formik.errors.registerPassword}</div>
          )}
        </div>
        <button className="btn btn-lg btn-primary" type="submit">
          Register
        </button>
        <p className="mt-3">
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;