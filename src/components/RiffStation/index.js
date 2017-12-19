import React, { Component } from 'react';
import Youtube from '../Players/Youtube';
import Timeline from '../Timeline';

import queryString from 'query-string';

import proxyFetch from '../../utils/proxyFetch';

const API_URL = 'https://play.riffstation.com/api/mir/songs';

class RiffStation extends Component {
    constructor(props) {
        super(props);
        this.state = { song: null };
    }
    componentWillMount() {     
        this.videoId = queryString.parse(window.location.search).videoId || 'oKsxPW6i3pM' ;
    }
    componentDidMount() {
        proxyFetch(API_URL, {
            params: {
                source: 'youtube',
                source_id: this.videoId
            }
        })
        .then(this.handleRequestSuccess.bind(this))
        .catch(this.handleRequestError.bind(this))
    }

    handleRequestSuccess({ song }) {
        this.setState({ song })
    }

    handleRequestError(err) {
        const { song } = require('../../data').default;
        this.setState({ song })
        console.info('loading fallback data', song);
    }

    render() {
        return (
            <div>
                {this.state.song && (
                    <Youtube 
                        videoId={this.state.song.source_id}
                    />
                )}
                
                {this.state.song && (
                    <Timeline 
                        duration={this.state.song.duration}
                        songEvents={this.state.song.song_events}
                    />
                )}
            </div>
        )
    }
}

export default RiffStation;