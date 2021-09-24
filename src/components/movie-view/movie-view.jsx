import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { profileView } from '../profile-view/profile-view';

export class Movieview extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback );
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    addFavorite() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.post('https://kaycee-anime-site.herokuapp.com/users/${username}/movies/${this.props.movie._id}', {}, {
            headers: { Authorization: 'Bearer ${token}' }
        })
        .then(response => {
            alert('Added to Favorites List')
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    render () {
        const { movie, onBackClick } = this.props;
        const { user } = this.props;
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                
                <div className="movie-title">
                    <span className="label">Title: {movie.Title} </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>


                <Link to={`/stream/${movie.Stream.Name}`}>
                    <Button variant="link">Stream: {movie.Stream.Name}</Button>
                </Link>
                
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre: {movie.Genre.Name}</Button>
                </Link>

                <Link to={`/user/${user}`}>
                    <Button variant="link">Profile</Button>
                </Link>

            </div>
        );
    }
    

}

Movieview.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Stream: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
    }).isRequired
};