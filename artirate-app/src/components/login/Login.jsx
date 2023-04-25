import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../constants/firebase.js";
import Signup from './Signup.jsx';
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';



const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});


function Login() {
  const [togglePage, setTogglePage] = useState(false);
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => logIn(data.email, data.password);
  const navigate = useNavigate()
  
  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      //console.log(user)
      localStorage.setItem("token", user.accessToken);
      navigate("/");

      return true
    } catch (error) {
      const errorContainer = document.querySelector(".login-error")
      errorContainer.innerHTML = "wrong username or password"
      console.log("error: " + error.message)
    }
  };

  const toggleSignUp = () => {
    setTogglePage(true);
  }


  return (
    <>
    {!togglePage ? (
      <Row className="justify-content-center">
        <Col xs={12} className="text-center pb-3">
          <h4>LOGIN</h4>
        </Col>
        <Col sm={8} md={6}>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
  
            {/* register your input into the hook by invoking the "register" function */}
            <label className="label">Email</label>
            <input className="form-control" {...register("email")} />
            {/* errors will return when field validation fails  */}
            <p>{errors.email?.message}</p>
  
            <label className="label">Password</label>
            <input className="form-control" type="password" {...register("password")} />
            <p>{errors.password?.message}</p>
  
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
              <input className="btn btn-primary mt-3 mt-md-0" type="submit" />
            </div>

            <div className="login-error text-end text-danger pt-1"></div>
          
          </form>
         <div className="signup-btn d-flex w-100 justify-content-end text-end pt-2" onClick={toggleSignUp}><p>Sign Up!</p></div>
        </Col>
    </Row>
    ) : (
      <Signup />
    )}
    </>
  );
}

export default Login