import React, {Component} from 'react';
import hashmaplogo from '../hashmap_banner_white.png';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import Cookies from "js-cookie";
import HealthcheckModal from "./PageNavbar_Components/HealthcheckModal.js";
import '../main.css'

class PageNavbar extends Component {
    constructor() {
        super();
        this.handleUtlOpen = this.handleUtlOpen.bind(this)
        this.handleUtlClose = this.handleUtlClose.bind(this)
        this.handleMoreOpen = this.handleMoreOpen.bind(this)
        this.handleMoreClose = this.handleMoreClose.bind(this)
        this.handleCookieOptOut = this.handleCookieOptOut.bind(this)
        this.state = { isUltOpen: false,
                       isMoreOpen: false
        }
    }

    handleUtlOpen = () => {
        this.setState({isUltOpen: true})
    }

    handleUtlClose = () => {
        this.setState({isUltOpen: false})
    }

    handleMoreOpen = () => {
        this.setState({isMoreOpen: true})
    }

    handleMoreClose = () => {
        this.setState({isMoreOpen: false})
    }

    // remove cookies when user clicks opt-out tab as well as the created cookie
    handleCookieOptOut = () => {
        window._hsp.push(['revokeCookieConsent']);
        Cookies.remove('_hs_form_submitted', {path: '/'});
        window.open("https://www.hashmapinc.com/opt-out")
        window.location.reload();
    }

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
                        <Nav.Link href="https://www.youtube.com/watch?v=H1HLZ3pkTQA&list=TLPQMTIwMjIwMjGVdYtB_QVhyA&index=6" rel="noopener noreferrer" target="_blank">How-To Video</Nav.Link>
                        <NavDropdown
                        onMouseEnter = { this.handleUtlOpen }
                        onMouseLeave = { this.handleUtlClose }
                        show = { this.state.isUltOpen }
                        title = "Other Utilities"                        
                        >
                            <NavDropdown.Item href="http://snowflakeinspector.hashmapinc.com/" rel="noopener noreferrer" target="_blank">Snowflake Inspector</NavDropdown.Item>
                            <NavDropdown.Item href="https://profiler.snowflakeinspector.com/" rel="noopener noreferrer" target="_blank">Snowflake Data Profiler</NavDropdown.Item>
                            <NavDropdown.Item href="https://estimator.snowflakeinspector.com/" rel="noopener noreferrer" target="_blank">Snowflake Estimator</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                        onMouseEnter = { this.handleMoreOpen }
                        onMouseLeave = { this.handleMoreClose }
                        show = { this.state.isMoreOpen }
                        title = "More Info"                        
                        >
                            <NavDropdown.Item href="https://www.hashmapinc.com/snowflake-utilities-accelerators" rel="noopener noreferrer" target="_blank">Other Accelerators</NavDropdown.Item>
                            <NavDropdown.Item href="https://github.com/hashmapinc/snowflake-healthcheck" rel="noopener noreferrer" target="_blank">GitHub Repo</NavDropdown.Item>
                            <NavDropdown.Item href="https://docs.google.com/forms/d/e/1FAIpQLSfdwvdakOH7p9cX0y5OXvXsTajKqg_KzKTrSSEZpssx8LgQ2g/viewform?usp=sf_link" rel="noopener noreferrer" target="_blank">Feedback</NavDropdown.Item>
                            <NavDropdown.Item href="https://www.hashmapinc.com/snowflakehealthcheck-reachout" rel="noopener noreferrer" target="_blank">Contact Us</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.handleCookieOptOut}>Opt Out of Cookie Agreement</NavDropdown.Item>
                        </NavDropdown>
                        <HealthcheckModal 
                        file_name={this.props.file_name}
                        handleSubmit={this.props.handleSubmit} 
                        handleInputChange={this.props.handleInputChange} 
                        handleModalOpen={this.props.handleModalOpen} 
                        handleModalClose={this.props.handleModalClose}
                        showModal={this.props.showModal}
                        clipboardButtonText={this.props.clipboardButtonText}
                        handleCopyToClipboard={this.props.handleCopyToClipboard}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> )
        
    }
}

export default PageNavbar

    