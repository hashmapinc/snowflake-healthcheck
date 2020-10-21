import React from 'react';
import {Modal, Button} from "react-bootstrap";
import UploadForm from "./UploadForm.js";
import CopyQuery from "./CopyQuery.js";
import '../../main.css'

class NavModal extends React.Component {
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
                    <CopyQuery />
                    <UploadForm file_name={this.props.file_name} handleSubmit={this.props.handleSubmit} handleModalClose={this.props.handleModalClose} handleInputChange={this.props.handleInputChange}/>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
                </Modal>
            </>
          );
    }
}

export default NavModal;