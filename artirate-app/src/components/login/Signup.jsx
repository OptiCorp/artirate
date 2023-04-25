import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../constants/firebase.js";
import { PostUser } from "../../services/userServices.js";

import { Row, Col } from 'react-bootstrap';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 6 characters')
    .max(30, 'Username must not exceed 30 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
});

export function Signup() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => signUpUser(data);
  const navigate = useNavigate();

  const signUpUser = async (data) => {
    try {
      const password = data.password;
      const username = data.username;
      const email = data.email;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      PostUser(user.uid, username, user.accessToken);
      navigate("/");
      return true
    } catch (error){
      return {error: error.message}
    }
  };
  
  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} className="text-center pb-3">
          <h4>SIGN UP</h4>
        </Col>
        <Col sm={8} md={6}>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
    
            {/* register your input into the hook by invoking the "register" function */}
            <label className="label">Email</label>
            <input className="form-control" {...register("email")} />
            {/* errors will return when field validation fails  */}
            <p>{errors.email?.message}</p>
    
            <label className="label">Username</label>
            <input className="form-control" {...register("username")} />
            <p>{errors.username?.message}</p>
    
            <label className="label">Password</label>
            <input className="form-control"  type="password" {...register("password")} />
            <p>{errors.password?.message}</p>
     
            <label className="label">Repeat Password</label>
            <input className="form-control"  type="password" {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
      
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
              <input className="btn btn-primary mt-3 mt-md-0" type="submit" />
            </div>
        
          </form>
        </Col>
      </Row>
    </>
  );
}
export default Signup;