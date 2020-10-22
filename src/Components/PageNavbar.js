import React, {Component} from 'react';
import hashmaplogo from '../hashmap_banner_white.png';
import {Navbar, Nav} from "react-bootstrap";
import HealthcheckModal from "./PageNavbar_Components/HealthcheckModal.js";
import '../main.css'

class PageNavbar extends Component {

    render() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="https://www.hashmapinc.com/" rel="noopener noreferrer" target="_blank">
                    {<img src={hashmaplogo} alt="Hashmap Logo" width="200px"/>}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="ml-auto my-2 text-white">
                        <h3>Snowflake Healthcheck</h3>
                    </div>
                    <Nav className="ml-auto">
                        <Nav.Link href="#Contact Us" rel="noopener noreferrer" target="_blank">Contact Us</Nav.Link>
                        <Nav.Link href="#Feedback" rel="noopener noreferrer" target="_blank">
                            Feedback
                        </Nav.Link>
                        <Nav.Link href="https://github.com/hashmapinc/snowflake-healthcheck" rel="noopener noreferrer" target="_blank">
                            GitHub Repo
                        </Nav.Link>
                        <HealthcheckModal 
                        file_name={this.props.file_name}
                        handleSubmit={this.props.handleSubmit} 
                        handleInputChange={this.props.handleInputChange} 
                        handleModalOpen={this.props.handleModalOpen} 
                        handleModalClose={this.props.handleModalClose}
                        showModal={this.props.showModal} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar> )
        
    }
}

export default PageNavbar

    