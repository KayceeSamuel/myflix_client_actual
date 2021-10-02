import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

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
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href={ movies }>Anime Recommender</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href= { movies }>Home</Nav.Link>
                            <Nav.Link href= { profile }>Profile</Nav.Link>
                            <Nav.Item href={`/`} onClick={this.onLoggedOut}>
                                Log Out
                            </Nav.Item>
                            <Nav.Link href= { register }>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;


