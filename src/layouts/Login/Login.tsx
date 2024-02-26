import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.module.css";
import { Link , useNavigate } from "react-router-dom";
import { LoginModel } from "../../models/requests/LoginModel";
import LoginService from "../../services/LoginService";
import TokenService from "../../services/TokenService";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../store/loginSlice";
import { setUser } from "../../store/userSlice";
import { selectReferringPage } from "../../store/referringPageSlice";
import { toast } from 'react-toastify';
import ProfileService from "../../services/ProfileService";

type Props = {};

interface LoginResponse {
  token: string;
  userId: number;
}

interface AuthCResult {
  success: boolean;
  message: string;
  loginResponse: LoginResponse;
}

interface ServerResponse {
  data: AuthCResult;
}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const referringPageState = useSelector(selectReferringPage);
  const formik = useFormik({
    initialValues: {
      loginUsername: "",
      loginPassword: "",
    },
    validationSchema: Yup.object({
      loginUsername: Yup.string().required("Username is required"),
      loginPassword: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      const loginData: LoginModel = {
        email: values.loginUsername,
        password:values.loginPassword
      };

      LoginService.login(loginData)
      .then((response:ServerResponse) => {
        if (response && response.data && response.data.loginResponse) {
          const { token } = response.data.loginResponse;
          TokenService.setToken(token);
          dispatch(setLoggedIn());
          ProfileService.getProfile(token).then((response) => {
            dispatch(setUser({userId: response.id}));
          });
          navigate(referringPageState);
          toast.success(response.data.message); 
        } else {
          console.error('Invalid response structure:', response);
          toast.error("Invalid username or password.");
        }
      })
      .catch(error => {
        console.log(error);
      });

    },
  });

  return (
    <main className="form-signin text-center">
      <form onSubmit={formik.handleSubmit}>
        <img className="mb-4" src={process.env.PUBLIC_URL + "/images/roboride.jpeg"} alt="" width="72" height="80" />
        <h1 className="h3 mb-3 fw-normal">Login</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${formik.touched.loginUsername && formik.errors.loginUsername ? "is-invalid" : ""}`}
            id="loginUsername"
            placeholder="Username"
            {...formik.getFieldProps("loginUsername")}
          />
          <label htmlFor="loginUsername">Username</label>
          {formik.touched.loginUsername && formik.errors.loginUsername && (
            <div className="invalid-feedback">{formik.errors.loginUsername}</div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${formik.touched.loginPassword && formik.errors.loginPassword ? "is-invalid" : ""}`}
            id="loginPassword"
            placeholder="Password"
            {...formik.getFieldProps("loginPassword")}
          />
          <label htmlFor="loginPassword">Password</label>
          {formik.touched.loginPassword && formik.errors.loginPassword && (
            <div className="invalid-feedback">{formik.errors.loginPassword}</div>
          )}
        </div>
        <button className="submit-btn btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <Link to={"/register"}>Register here</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
