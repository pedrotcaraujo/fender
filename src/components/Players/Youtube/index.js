import React, { Component } from 'react';
import youtubePlayer from 'youtube-player';
import RiffStationDispatcher from '../../../dispatchers/RiffStationDispatcher';

class Youtube extends Component {
    componentDidMount() {
        this.player = youtubePlayer(this.container);
        this.player.loadVideoById(this.props.videoId);
        this.player.on('ready', this.onReady.bind(this))
        this.player.on('stateChange', this.onStateChange.bind(this))
    }

    onReady() {
        return this.props.onReady && this.props.onReady()
    }

    onStateChange({ data }) {
        const current = this.handleState(data);
        const player = this.player;

        player.getCurrentTime()
            .then(time => {
                RiffStationDispatcher.dispatch({
                    type: 'UPDATE_PLAYER',
                    data: {current, time, player}
                })
            });
    }

    handleState(data) {
        if (data === -1) 
            return 'UNSTARTED';

        if (data === 0) 
            return 'ENDED';

        if (data === 1) 
            return 'PLAYING';

        if (data === 2) 
            return 'PAUSED';

        if (data === 3) 
            return 'BUFFERING';
            
        if (data === 5) 
            return 'CUE';
    }

    refContainer(container) {
        this.container = container;
    }

    render() {
        return (
            <div ref={(container) => this.refContainer(container)}/>
        )
    }
}

export default Youtube

