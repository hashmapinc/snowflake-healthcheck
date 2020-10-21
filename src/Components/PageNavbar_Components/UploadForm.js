import React from 'react';
import {Form} from "react-bootstrap";
import UploadFile from "./UploadFile.js";
import UploadFileButton from "./UploadFileButton"
import '../../main.css'

class UploadForm extends React.Component {
   
    render() {
        return (
            <Form className="input-group" onSubmit={this.props.handleSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <UploadFileButton handleModalClose={this.props.handleModalClose}/>
                    </div> 
                    <UploadFile handleInputChange={this.props.handleInputChange} file_name={this.props.file_name}/>
                </div>
            </Form>
            

            
            
        );
    }
}

export default UploadForm;