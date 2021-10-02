import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class StreamView extends React.Component {
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;
        const { stream } = this.props;

        return (
            <div className="stream-view">
                <div className="stream-name">
                    <span className="label">Stream name: </span>
                    <span className="value">{stream.Name}</span>
                </div>

                <div className="stream-about">
                    <span className="label">About: </span>
                    <span className="value">{stream.About}</span>
                </div>

            </div>
        )
    }
}