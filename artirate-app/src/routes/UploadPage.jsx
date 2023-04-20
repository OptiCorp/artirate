import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../services/AuthContext.js"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { uploadToCloud } from "../services/uploadServices.js";
import { PostImage } from "../services/imageServices.js";

const schema = Yup.object().shape({
    upload: Yup.mixed()
    .test("required", "You need to provide a file", (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
        if (file) return true;
        return false;
    }),
    prompt: Yup.string()
        .required('Prompt is required')
        .min(6, 'Prompt must be at least 6 characters'),
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
});


const UploadPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    const onSubmit = data => uploadImage(data);

    const clearForm = () => {
        const form = document.getElementById("upload-form");
        if(form){
            form.reset();
        }
    }

    const uploadImage = (data) => { 
        const file = document.querySelector("#upload").files[0];
        uploadToCloud(file).then((imgUrl)=> {
           //console.log(data);
           //console.log(imgUrl);
           PostImage(imgUrl, data, user)
        });
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
               <input className="form-control" type="file" id="upload" {...register("upload") }/>
               <p>{errors.upload?.message}</p>
            </div>
            <label className="form-label">Title</label>
            <input type="text" className="form-control" {...register("title")} />
            <p>{errors.title?.message}</p>
            <input type="hidden" className="form-control" value="No description" {...register("description")} />
            <p>{errors.description?.message}</p>
            <label className="form-label">Generator</label>
            <select type="text" className="form-select" {...register("generator")} >
                <option value="1"> Option 1</option>
                <option value="2"> Option 2</option>
                <option value="3"> Option 3</option>
            </select>
            <p>{errors.generator?.message}</p>
            <label className="form-label">Prompt</label>
            <textarea type="text" className="form-control" {...register("prompt")} rows="3"></textarea>
            <p>{errors.prompt?.message}</p>
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