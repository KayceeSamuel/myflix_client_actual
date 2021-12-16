import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './register.scss';

export function RegistrationView(props) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [birthdateError, setBirthdateError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /*send a request to the server for the authentication */
        axios.post('https://kaycee-anime-site.herokuapp.com/users', {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // the second argument _self is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering the user')
            })
    }
    const formValidation = () => {
        let nameError = {};
        let usernameError = {};
        let passwordError = {};
        let emailErorr = {};
        let birthdateError = {};
        let isValid = true

        if (name === '') {
            nameError.nameEmpty = "Please enter your Name";
            isValid = false;
        }

        if (username.trim().length < 4) {
            usernameError.usernameShort = "Username incorrect. Use at least 4 characters";
            isValid = false;
        }

        if (password.trim().length < 5) {
            passwordError.passwordMissing = "Password incorrect. Use at least 5 characters";
            isValid = false;
        }

        if (!(email && email.includes(".") && email.includes("@"))) {
            emailError.emailNotEmail = "Email address incorrect";
            isValid = false;
        }

        if (birthdate === '') {
            birthdateError.birthdaydateEmpty = "Please enter your birthdate";
            isValid = false;
        }

        setNameError(nameError);
        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        setBirthdateError(birthdateError);
        return isValid


    }
    return (
        <Form className="register justify-content-md-center">
            <Row>
                <Form.Group controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    {Object.keys(usernameError).map((key) => {
                        return (
                            <div key={key}>
                                {usernameError[key]}
                            </div>
                        );
                    })}
                </Form.Group>
            </Row>

            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                {Object.keys(usernameError).map((key) => {
                    return (
                        <div key={key}>
                            {usernameError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <Row>
                <Form.Group controlId="formPassword">
                    <Form.Label>Create Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {Object.keys(passwordError).map((key) => {
                        return (
                            <div key={key}>
                                {passwordError[key]}
                            </div>
                        );
                    })}
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {Object.keys(emailError).map((key) => {
                        return (
                            <div key={key}>
                                {emailError[key]}
                            </div>
                        );
                    })}
                </Form.Group>
            </Row>

            <Form.Group controlId="formBirthdate">
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
                {Object.keys(birthdateError).map((key) => {
                    return (
                        <div key={key}>
                            {birthdateError[key]}
                        </div>
                    );
                })}
            </Form.Group>
            
            <span>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
                {' '}
                <Link to="/">
                    <Button variant="secondary" type="button">Back</Button>
                </Link>
            </span>

        </Form>
    );
}

RegistrationView.propTypes = {
    movie: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Stream: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
    }).isRequired
};