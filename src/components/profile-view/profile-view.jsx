import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CardDeck, Form } from 'react-bootstrap';
import userEvent from '@testing-library/user-event';

export class profileView extends React.Component{
    constructor () {
        super ();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
            validated: null
        }
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !==null){
            this.getUsers(accessToken);
        } 
    }

    //get the users
    getUsers(token) {
        axios.get('https://kaycee-anime-site.herokuapp.com/users', {
            headers: { Authorization: 'Bearer${token}' }
        })
        .then(response => {
            //Assign the result to the state
            this.setState({
                users: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }


     render (){
        const { users } = this.props;
        const { movie } = this.props;
        
        return(
            <h1>playceholder</h1>
        )

    };
}


