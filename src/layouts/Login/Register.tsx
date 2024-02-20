import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.module.css';
import { Link , useNavigate} from 'react-router-dom';
import RegisterService from '../../services/RegisterService';
import { useState } from 'react';
import RoleService from '../../services/RoleService';
import { useEffect } from 'react';
import { RoleModel } from '../../models/response/RoleModel';
import { RegisterModel } from '../../models/requests/RegisterModel';

type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      registerEmail: '',
      registerPassword: '',
      roles: '',
    },
    validationSchema: Yup.object({
      registerEmail: Yup.string().email('Invalid email address').required('Email is required'),
      registerPassword: Yup.string().required('Password is required'),
      roles: Yup.string().required('At least one role is required')
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      const registerData: RegisterModel = {
        email: values.registerEmail,
        password: values.registerPassword,
        roles: [values.roles],
      };
      
      try {
        RegisterService.register(registerData);
        // Redirect to login page after successful registration
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle error if registration fails
      }
    },
  });



  const [roles, setRoles] = useState<RoleModel[]>([]);

  useEffect(() => {
    RoleService.getAllRoles().then(setRoles)
  }, [])
  

  return (
    <main className="form-signin text-center">
      <form onSubmit={formik.handleSubmit}>
        <img
          className="mb-4"
          src={process.env.PUBLIC_URL + "/images/roboride.jpeg"}
          alt=""
          width="72"
          height="80"
        />
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${
              formik.touched.registerEmail && formik.errors.registerEmail
                ? "is-invalid"
                : ""
            }`}
            id="registerEmail"
            placeholder="Email"
            {...formik.getFieldProps("registerEmail")}
          />
          <label htmlFor="registerEmail">Email</label>
          {formik.touched.registerEmail && formik.errors.registerEmail && (
            <div className="invalid-feedback">
              {formik.errors.registerEmail}
            </div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${
              formik.touched.registerPassword && formik.errors.registerPassword
                ? "is-invalid"
                : ""
            }`}
            id="registerPassword"
            placeholder="Password"
            {...formik.getFieldProps("registerPassword")}
          />
          <label htmlFor="registerPassword">Password</label>
          {formik.touched.registerPassword &&
            formik.errors.registerPassword && (
              <div className="invalid-feedback">
                {formik.errors.registerPassword}
              </div>
            )}

        </div>


        {/* Roles Selection Box */}
        <div className="form-floating mb-3">
          
          <select
            className={`form-control ${
              formik.touched.roles && formik.errors.roles ? "is-invalid" : ""
            }`}
            id="roles"
            {...formik.getFieldProps("roles")}
          >
            <option value="">Select Customer Type</option>
            {roles.map((role) => (
              <option key={role.name} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <label htmlFor="roles">Customer Type</label>
          {formik.touched.roles && formik.errors.roles && (
            <div className="invalid-feedback">{formik.errors.roles}</div>   
          )}
          
        </div>
        {/* Roles Selection Box */}

        <button className="submit-btn btn btn-lg btn-primary" type="submit">
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