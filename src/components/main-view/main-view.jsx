import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { Movieview } from '../movie-view/movie-view';


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
        axios.get('https://kaycee-anime-site.herokuapp.com/movies')
            .then(response => {

                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;
        /* if there is no user, the LoginView is rendered. IF there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        
        if (movies.length === 0) return <div className="main-view" />;
        return (
            <div className="main-view">
                {/*If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                {selectedMovie
                    ? <Movieview movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                    ))
                    }
            </div>
        );
    }
}