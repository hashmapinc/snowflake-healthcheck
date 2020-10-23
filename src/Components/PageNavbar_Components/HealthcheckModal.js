import React from 'react';
import {Modal, Button, Container, Row} from "react-bootstrap";
import UploadForm from "./UploadForm.js";
import HealthcheckQuery from "./HealthcheckQuery.js";
import '../../main.css'

class HealthcheckModal extends React.Component {
    render() {
        return (
            <>
              <Button className="ml-3" variant="primary" onClick={this.props.handleModalOpen}>
                New Report
              </Button>
                <Modal className="fade" centered size="lg" show={this.props.showModal} onHide={this.props.handleModalClose}>
                  <Container fluid>
                        <Modal.Header>
                          <Modal.Title className="font-weight-bold">Run this query in your Snowflake account and upload the result file below</Modal.Title>
                        </Modal.Header>
                      <Row>
                        <Modal.Body>
                          <HealthcheckQuery handleCopyToClipboard={this.props.handleCopyToClipboard} clipboardButtonText={this.props.clipboardButtonText}/>
                          <UploadForm file_name={this.props.file_name} handleSubmit={this.props.handleSubmit} handleModalClose={this.props.handleModalClose} handleInputChange={this.props.handleInputChange}/>
                        </Modal.Body>
                      </Row>
                  </Container>
                </Modal>
            </>
          );
    }
}

export default HealthcheckModal;