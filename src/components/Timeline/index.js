import React, { Component } from 'react';
import './style.css';

import RiffStationStore from '../../stores/RiffStationStore';
import ChordStrip from '../Chords/ChordStrip';

const PIXEL_PER_SECOND = 70;

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'UNSTARTED',
            time: 0
        }
    }
    componentDidMount() {
        // shared playerstate
        RiffStationStore.addPlayerListener(this.syncState.bind(this))

        this.setupStyle = {
            width: this.props.duration * PIXEL_PER_SECOND + 'px'
        };
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.rframe)
        RiffStationStore.removePlayerListener(this.syncState)
    }

    handleStripClick(event, time) {
        this.state.player.seekTo(time, true);
    }

    isCurrentChord(beatTime, duration) {
        const endTime = beatTime + duration;
        const currentTime = this.state.time;
        return (currentTime >= beatTime && currentTime <= endTime)
    }

    syncState() {
        this.setState(RiffStationStore.getPlayerState())
        this.startAnimation();
    }

    startAnimation() {
        if (!this.rframe) {
            this.rframe = window.requestAnimationFrame(this.animate.bind(this))
        }
    }

    animate() {   
        this.state.player.getCurrentTime().then(time => {
            this.setState(Object.assign({}, this.state, { time }))
            this.rframe = window.requestAnimationFrame(this.animate.bind(this))
        })
    }

    styleByState() {
        return Object.assign({}, this.setupStyle, {
            transform: `translateX(-${this.state.time * PIXEL_PER_SECOND}px)`
        })
    }

    render() {
        return (
            <div className="Timeline">
                <span className="Timeline-pointer"/>
                <div className="Timeline-wrapper" style={this.styleByState()}>
                    {this.props.songEvents.map(({name, duration, beat_time}, index) => (
                        <ChordStrip 
                            key={index} 
                            name={name} 
                            size={duration * PIXEL_PER_SECOND}
                            active={this.isCurrentChord(beat_time, duration)} 
                            events={{
                                onClick: event => this.handleStripClick(event, beat_time)
                            }}
                            />
                        )
                    )}
                </div>
            </div>
        )
    }
}

export default Timeline;