import React, { useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [birthday, setBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /*send a request to the server for the authentication */
        axios.post('YOUR_API_URL/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
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