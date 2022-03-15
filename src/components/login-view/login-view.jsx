import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';



import './login.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://kaycee-anime-site.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <div className="login">
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    <>{console.log(password)}</>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <span>
        
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => {window.location.href="/register"}} variant="secondary">Register</Button>
                </span>
            </Form>
        </div>

    );
}