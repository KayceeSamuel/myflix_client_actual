import React from 'react';
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';


import axios from 'axios';
import { Form } from 'react-bootstrap';

import './profile.scss';


export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
            validated: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            this.getUser(accessToken);
        }
    }

    //get the user
    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://kaycee-anime-site.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer${token}` },
        })
            .then(response => {
                //Assign the result to the state
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //function to remove favorite movie
   /* removeFavoriteMovie(id) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.delete(`https://kaycee-anime-site.herokuapp.com/users/${username}/movies/${id}`, {
            //      axios.delete(`https://kaycee-anime-site.herokuapp.com/users/${username}/movies/${this.props.movieId}
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert('Movie has been removed');
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    */

    //function to update users profile
    handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthdate) {
        this.state({
            validated: null,
        });

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                validated: true,
            });
            return;
        }

        e.preventDefault();

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.put(`https://kaycee-anime-site.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bear ${token}` },
            data: {
                Name: newName ? newName : this.state.Name,
                Username: newUsername ? newUsername : this.state.Username,
                Password: newPassword ? newPassword : this.state.Password,
                Email: newEmail ? newEmail : this.state.Email,
                Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
            },
        })
            .then((response) => {
                alert('Saved Changes');
                this.setState({
                    Name: response.data.Name,
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthdate: response.data.Birthdate,
                });
                localStorage.setItem('user', this.state.Username);
                window.open(`/users/&{username}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    setName(input) {
        this.Name = input;
    }

    setUsername(input) {
        this.Username = input;
    }

    setPassword(input) {
        this.Password = input;
    }

    setEmail(input) {
        this.Email = input;
    }

    setBirthdate(input) {
        this.Birthdate = input;
    }

    //Delete user
    handleDeleteUser(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.delete(`https://kaycee-anime-site.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                alert('Your account has been deleted!');
                window.open('/', '_self');
            })
            .catch((e) => {
                console.log(e);
            });
    }


    renderFavoriteMovies = () => {
        const { FavoriteMovies } = this.state;
        const { movies } = this.props;

        return FavoriteMovies.map((movie, index) => {
            const movCard = movies.find(m => m._id === movie)
            return (
                    /*<CardDeck className="movie-card-deck" key={index}>
                        <Card className="favorites" style={{ width: '16rem ' }} key={movCard._id}>
                            <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movCard.ImagePath} />
                            <Card.Body>
                                <Card.Title className="movie-card-title">{movCard.Title}</Card.Title>
                                <Button size='sm' className='deleteButton' variant='danger' value={movCard._id} onClick={(e) => this.removeFavoriteMovie(movCard._id)}>
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    </CardDeck>*/
                    <Col className="cardDisplay" xs={2} md={3} key={movCard._id}>
                        <MovieCard movie={movCard} />
                    </Col>
                

            )
        })
    }

    render() {
        const { FavoriteMovies } = this.state;


        return (
            <Row className="profile-view">
                <div className="description view">
                    <div>
                        <p>Username: {this.state.Username}</p>
                    </div>
                    <div>
                        <p>Email: {this.state.Email}</p>
                    </div>
                    <div>
                        <p>Birthday: {this.state.Birthday}</p>
                    </div>

                </div>
                <Row className="favorite-movies">
                    <h4 className="animeHeader">Favorite Anime</h4>
                    {!!FavoriteMovies.length ? this.renderFavoriteMovies() : <Col className="noFavorites"><h3>No favorite movies available</h3></Col>}
                    
                </Row>
                <div className="updateSection">
                    <h1>Update Profile</h1>
                    <Card.Body>
                        <Form noValidate validated={this.state.validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthdate)}>

                            <Form.Group controlId="formName">
                                <Form.Label className="form-label">Name</Form.Label>
                                <Form.Control type="text" placeholder="Change Name" onChange={(e) => this.setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUsername">
                                <Form.Label className="form-label">Username</Form.Label>
                                <Form.Control type="text" placeholder="Change Name" onChange={(e) => this.setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="form-label">
                                    Password<span className="required">*</span>
                                </Form.Label>
                                <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="form-label">Email</Form.Label>
                                <Form.Control type="date" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicBirthday">
                                <Form.Label className="form-label">Birthdate</Form.Label>
                                <Form.Control type="date" placeholder="Change Birthdate" onChange={(e) => this.setBirthdate(e.target.value)} />
                            </Form.Group>

                            <Button variant='danger' onClick={(e) => this.handleUpdate(e)} type="submit">
                                Update
                            </Button>

                            <div>
                                <h3 className="delete-text"> Delete your Account</h3>
                                <Card.Body>
                                    <div className="delete-account">
                                        <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                                            Delete Account
                                        </Button>
                                    </div>
                                </Card.Body>
                            </div>
                        </Form>

                    </Card.Body>
                </div>

            </Row>

        )

    }


}

/*ProfileView.propTypes = {
    user: PropTypes.shape({
        FavoriteMovies: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                Title: PropTypes.string.isRequired
            })
        ),
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthdate: PropTypes.instanceOf(Date)
    }),
};*/


