import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { Movieview } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { StreamView } from '../stream-view/stream-view';
import { GenreView } from '../genre/genre';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { profileView } from '../profile-view/profile-view';



export class Mainview extends React.Component{
    constructor(){
        super();
        //Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !==null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user:null
        });
    }

    getMovies(token) {
        axios.get('https://kaycee-anime-site.herokuapp.com/movies', {
            headers: { Authorization: 'Bearer${token}'}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    render() {
        const { movies, selectedMovie, user } = this.state;
        /* if there is no user, the LoginView is rendered. IF there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        </Row>
        
        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIN={user => this.onLoggedIn (user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if(user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match }) =>{
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn (user)} />
                        </Col>                 
                        return <Col md={8}>
                            <Movieview movie={movies.find(m => m._id === match.params.movieId)} />
                        </Col>
                    }} />

                    <Route path="/stream/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>                                                
                        if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <StreamView stream={movies.find(m => m.Stream.Name === match.params.name).Stream} onBackClick={() => history.goBack()} />
                            </Col>
                    }} /> 


                    <Route path="/genres/:name" render={({ match, history }) => {
   
                        if (movies.length ===0) return <div className="main-view" />;
                            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                    }} />

                  
                    
                </Row>
            
            </Router>
        );
    }

};