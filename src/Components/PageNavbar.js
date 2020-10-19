import React, {Component} from 'react';
import hashmaplogo from '../hashmap_banner_white.png';
import {Navbar, Nav} from "react-bootstrap";
import NavModal from "./PageNavbar_Components/NavModal.js";
import '../main.css'

class PageNavbar extends Component {
    constructor(props) {
        super(props);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

        this.state = {
            showModal: false,
        }
    }

    handleModalOpen() {
        this.setState({
            showModal: true
        })
    }

    handleModalClose() {
        this.setState({
            showModal: false
        })
    }

    render() {
        let {showModal} = this.state;

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
                        <NavModal showModal={showModal} handleModalOpen={this.handleModalOpen} handleModalClose={this.handleModalClose}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> )
        
    }
}

export default PageNavbar

    