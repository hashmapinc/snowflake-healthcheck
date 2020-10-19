import React from 'react';
import {Modal, Button} from "react-bootstrap";
import '../../main.css'

class NavModal extends React.Component {
    render() {
        return (
            <>
              <Button variant="primary" onClick={this.props.handleOpen}>
                Launch demo modal
              </Button>
        
              <Modal onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.props.handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
}

export default NavModal;