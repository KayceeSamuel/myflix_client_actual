import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CardDeck, Form } from 'react-bootstrap';
import userEvent from '@testing-library/user-event';

export class ProfileView extends React.Component{
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

    //get the user
    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://kaycee-anime-site.herokuapp.com/users/${username}`, {
            headers: { Authorization: 'Bearer${token}' },
        })
        .then(response => {
            //Assign the result to the state
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }


     render (){
        const { FavoriteMovies, validated } = this.props;
        const { movies } = this.props;
        
        return(
            <div className="profile-view">
                <div className="description view">
                    <h1>{this.state.Username}</h1>
                    <h3>{this.state.Email}</h3>
                    <h3>{this.state.FavoriteMovies}</h3>
                </div>
                <div>
                    <h1>Placeholder</h1>
                </div>
            </div>
            
        )

    };
}


