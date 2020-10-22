import React from 'react';
import {Form} from "react-bootstrap";
import CsvUploader from "./CsvUploader.js";
import CsvUploaderButton from "./CsvUploaderButton"
import '../../main.css'

class UploadForm extends React.Component {
   
    render() {
        return (
            <Form className="needs-validation" onSubmit={this.props.handleSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <CsvUploaderButton handleModalClose={this.props.handleModalClose}/>
                    </div> 
                    <CsvUploader handleInputChange={this.props.handleInputChange} file_name={this.props.file_name}/>
                </div>
            </Form>
            

            
            
        );
    }
}

export default UploadForm;