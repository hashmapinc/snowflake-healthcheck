import React from 'react';
import {Button} from "react-bootstrap";
import '../../main.css'

class UploadCSVButton extends React.Component {

    render() {
        return (
            <Button type="submit" variant="btn btn-primary btn-md" onClick={this.props.handleModalClose}>
                Visualize
            </Button>
            

            
            
        );
    }
}

export default UploadCSVButton;