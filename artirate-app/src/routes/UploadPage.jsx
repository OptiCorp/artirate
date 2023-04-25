import { useContext } from "react";
import AuthContext from "../services/AuthContext.js"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { uploadToCloud } from "../services/uploadServices.js";
import { PostImage } from "../services/imageServices.js";
import GeneratorOptions from "../components/upload/GeneratorOptions.jsx";

const schema = Yup.object().shape({
    upload: Yup.mixed()
    .test("required", "You need to provide a file", (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
        if (file) return true;
        return false;
    }),
    prompt: Yup.string()
        .required('Prompt is required'),
    title: Yup.string()
        .required('Title is required'),
    generator: Yup.string()
    .required('Remember to pick a generator')
});


const UploadPage = () => {
    const { user } = useContext(AuthContext);
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
           PostImage(imgUrl, data, user);
           window.alert("Image uploaded!");
        });
     } 


    return (
    <>
    <Row>
        <Col>
        <h4 className="text-center">UPLOAD</h4>
        </Col>
    </Row>
        {user? 
        (<>
        <Row className="justify-content-center">
            <Col sm={8} md={6} className="px-5 px-md-1 p-1">
                <form id="upload-form" className="w-100" onSubmit={handleSubmit(onSubmit)}>
                    <div className="upload-box w-100 mb-2 d-flex justify-content-center align-items-center">
                       <img src="https://bootstrapious.com/i/snippets/sn-img-upload/image.svg" alt="" className="mb-4 upload-icon" />
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
                        <GeneratorOptions />
                    </select>
                    <p>{errors.generator?.message}</p>
                    <label className="form-label">Prompt</label>
                    <textarea type="text" className="form-control" {...register("prompt")} rows="3"></textarea>
                    <p>{errors.prompt?.message}</p>
                </form>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col sm={8} md={6}  className="px-5 px-md-1 p-1">
                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-secondary" form="upload-form" onClick={clearForm()}>Cancel</button>
                    <button type="submit" className="btn btn-primary ms-1" form="upload-form">Upload</button>
                </div>
            </Col>
        </Row>
        </>) : 
        (<>
            <Col xs={12} className="text-center mt-5">Log in or Sign Up to upload Images ;)</Col>
        </>)}
    </>
    );
};

export default UploadPage;