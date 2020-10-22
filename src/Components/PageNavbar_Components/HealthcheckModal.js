import React from 'react';
import {Modal, Button} from "react-bootstrap";
import UploadForm from "./UploadForm.js";
import HealthcheckQuery from "./HealthcheckQuery.js";
import '../../main.css'

class HealthcheckModal extends React.Component {
    render() {
        return (
            <>
              <Button variant="primary" onClick={this.props.handleModalOpen}>
                Check Environment Health
              </Button>
                <Modal size="lg" show={this.props.showModal} onHide={this.props.handleModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Run this query in your Snowflake account and upload the result file below</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <HealthcheckQuery />
                    <UploadForm file_name={this.props.file_name} handleSubmit={this.props.handleSubmit} handleModalClose={this.props.handleModalClose} handleInputChange={this.props.handleInputChange}/>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
                </Modal>
            </>
          );
    }
}

export default HealthcheckModal;