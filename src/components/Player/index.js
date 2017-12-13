import React, { Component } from 'react';

class Player extends Component {
    componentWillMount() {
        if (!window.YT) {
            new Error('Youtube iframe API is not present');
        }
    }
    
    componentDidMount() {
        console.log('Player OK');
    }

    render() {
        return (
            <iframe title='Youtube video' width="560" height="315" src={`https://www.youtube.com/embed/${this.props.videoId}`} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
        )
    }
}

export default Player

