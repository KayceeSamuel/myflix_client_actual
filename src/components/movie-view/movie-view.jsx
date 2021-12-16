import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ProfileView } from '../profile-view/profile-view';
import './movieView.scss';
import { Container, Row, Col, Image } from 'react-bootstrap';

export class Movieview extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    addFavorite() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.post(`https://kaycee-anime-site.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                alert('Added to Favorites List')
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { movie } = this.props;
        const { user } = this.props;
        const { onBackClick } = this.props;


        return (
            <Container className="moviesContainer">
                <Row>
                    <Col>
                        <div className="movie-view">
                            <div className="movie-poster">
                                <img className="movie-pic" src={movie.ImagePath} alt='pic of anime' />
                            </div>
                            <div className="remainingText">
                                <div className="movie-title">

                                    <span className="main-text">{movie.Title}</span>
                                </div>
                                <div className="movie-description">
                                    <span className="label">Description: </span>
                                    <span className="value">{movie.Description}</span>
                                </div>

                                <div>
                                <Link to={`/stream/${movie.Stream.Name}`}>
                                    <Button variant="link">Stream: {movie.Stream.Name}</Button>
                                </Link>

                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">Genre: {movie.Genre.Name}</Button>
                                </Link>
                                </div>

                                <Button variant='danger' className='fav-button' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
                                    Add to Favorites
                                </Button>
                                <div>
                                <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
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