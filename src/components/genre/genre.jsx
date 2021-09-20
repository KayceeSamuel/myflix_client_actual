import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';

export class GenreView extends React.Component {
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.removeEventListener('keypress', this.keyCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const {genre, onBackClick} = this.props;
        console.log(genre)
        return(
            <div className="genre-view">
                <div className="genre-title">
                    <span className="label">Genre: </span>
                    <span className="value">{genre.Name}</span>
                </div>

                <div classname="Genre-description">
                    <span className="label">Description: </span>
                    <span className="value">{genre.Description}</span>
                </div>
            </div>
        )
    
    }
}