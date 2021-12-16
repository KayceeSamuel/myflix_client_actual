import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './navbar.scss';
import logo from '../img/logoFinished5.png';

export class NavBar extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    render() {

        const { user } = this.props;
        const movies = `/`;
        const profile = `/users/${user}`;
        const register = `/register`;


        return (
            <Navbar className="navcorrect" bg="light" expand="lg">
            <Container className="NavbarItems">
              <Navbar.Brand className="remainingnavs" href={movies}>
                  <img
                  alt=""
                  src={logo}
                  
                  className="imgSize"
                />
              </Navbar.Brand>
                    
                    <Navbar.Toggle className="menu" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="nav-menu">
                            <Nav.Link href= { movies }>Home</Nav.Link>
                            <Nav.Link href= { profile }>Profile</Nav.Link>
                            <Nav.Link href={`/`} onClick={this.onLoggedOut}>
                                Log Out
                            </Nav.Link>
                            <Nav.Link href= { register }>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;


