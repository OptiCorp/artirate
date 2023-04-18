import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../services/AuthContext.js"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    upload: Yup.mixed()
    .test("required", "You need to provide a file", (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
        if (file) return true;
        return false;
    })
    .test("fileSize", "The file is too large", (file) => {
        //if u want to allow only certain file sizes
        return file && file.size <= 2000000;
    }),
    description: Yup.string()
        .min(6, 'Description must be at least 6 characters'),
    prompt: Yup.string()
        .required('Prompt is required')
        .min(6, 'Prompt must be at least 6 characters')
});


const UploadPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    const onSubmit = data => submitFunction(data);

    const submitFunction = (data) => {
        console.log(data);
    }

    const clearForm = () => {
        const form = document.getElementById("upload-form");
        if(form){
            form.reset();
        }
    }


    
    if (!user) {
        return <Navigate replace to="/profile" />;
    }
    return (
    <>
    <Row>
        <Col>
        <h4 className="text-center">UPLOAD</h4>
        </Col>
    </Row>
    <Row className="justify-content-center">
        <Col>
          <form id="upload-form" className="w-100" onSubmit={handleSubmit(onSubmit)}>
            <div className="upload-box w-100 mb-2">
            </div>
            <label className="form-label">Prompt</label>
            <input type="text" className="form-control" />
            <label className="form-label">Description</label>
            <input type="text" className="form-control" />
          </form>
        </Col>
        <Col xs={12}>
            <div className="d-flex justify-content-end mt-3">
                <button type="button" className="btn btn-secondary" form="upload-form" onClick={clearForm()}>Cancel</button>
                <button type="submit" className="btn btn-primary ms-1" form="upload-form">Upload</button>
            </div>
        </Col>
    </Row>
    </>
    );
};

export default UploadPage;