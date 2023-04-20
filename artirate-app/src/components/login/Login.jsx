import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../constants/firebase.js";
import Signup from './Signup.jsx';

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

      return true
    } catch (error) {
      return {error: error.message}
    }
  };

  const toggleSignUp = () => {
    setTogglePage(true);
  }


  return (
    <>
    {!togglePage ? (
      <div className="login-container">
      <h6>Sign In</h6>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* register your input into the hook by invoking the "register" function */}
        <label className="label">Email</label>
        <input className="form-control" {...register("email")} />
        {/* errors will return when field validation fails  */}
        <p>{errors.email?.message}</p>

        <label className="label">Password</label>
        <input className="form-control" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <input className="btn btn-primary" type="submit" />
        </div>
        
      </form>
      <div className="signup-btn d-flex w-100 justify-content-end text-end pt-2" onClick={toggleSignUp}><p>Sign Up!</p></div>
    </div>
    ) : (
      <Signup />
    )}
    </>
  );
}

export default Login