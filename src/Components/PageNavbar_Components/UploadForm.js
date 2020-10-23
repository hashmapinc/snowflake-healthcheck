import React from 'react';
import {Form, Button, Row, Container, Modal} from "react-bootstrap";
import CsvUploader from "./CsvUploader.js";
import CsvUploaderButton from "./CsvUploaderButton"
import '../../main.css'

class UploadForm extends React.Component {
   
    render() {
        return (
            <Container fluid>
                    <Form className="needs-validation" onSubmit={this.props.handleSubmit}>
                            <div className="ml-2 mr-2 mt-3 mb-4">
                                <CsvUploader handleInputChange={this.props.handleInputChange} file_name={this.props.file_name}/>
                            </div>
                            <Modal.Footer className="mt-4">
                                <Row>
                                    <div className="col-md-12 mt-3 text-right">
                                        <Button className="mr-3" variant="secondary" onClick={this.props.handleModalClose}>
                                            Close
                                        </Button>
                                        <CsvUploaderButton handleModalClose={this.props.handleModalClose}/>
                                    </div>
                                </Row>
                            </Modal.Footer>
                            
                    </Form>
            </Container>
            
            

            
            
        );
    }
}

export default UploadForm;