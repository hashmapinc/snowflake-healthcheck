import React from 'react';
import {Form} from "react-bootstrap";
import UploadCSV from "./UploadCSV.js";
import UploadCSVButton from "./UploadCSVButton"
import '../../main.css'

class UploadForm extends React.Component {
   
    render() {
        return (
            <Form className="input-group" onSubmit={this.props.handleSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <UploadCSVButton handleModalClose={this.props.handleModalClose}/>
                    </div> 
                    <UploadCSV handleInputChange={this.props.handleInputChange} file_name={this.props.file_name}/>
                </div>
            </Form>
            

            
            
        );
    }
}

export default UploadForm;