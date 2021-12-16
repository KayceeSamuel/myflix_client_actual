import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';

import { Movieview } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { StreamView } from '../stream-view/stream-view';
import { GenreView } from '../genre/genre';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main.scss';
import FooterPage from '../footer/footerView';




class Mainview extends React.Component {
    constructor() {
        super();
        //Initial state is set to null
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
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
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://kaycee-anime-site.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        const { movies } = this.props;
        const { user } = this.state;
        
        
   
        return (
            <Router>
                <NavBar user={user} />
                <div className="firstHeader">
                    <h1>Animeny</h1>
                </div>


                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        console.log('login')
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <MoviesList movies={movies} />
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView user={user} />
                        </Col>
                    }} />

                    <Route path="/login" render={() => {
                        if(user) return <Redirect to="/" />
                        return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <Movieview movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
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
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                    }} />

                    <Route path="/profile" render={() => {
                        if (!user) return <Col>
                            <ProfileView />
                        </Col>
                    }} />

                    <Route exact path='/users/:username' render={({ history }) => {
                        if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                        if (movies.length === 0) return <div className="main-view" />;
                        return <ProfileView history={history} movies={movies} user={this.state.user} />

                    }} />

                </Row>
                <FooterPage />

            </Router>
        );
    }

};

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(Mainview);