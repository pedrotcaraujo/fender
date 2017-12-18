import React, { Component } from 'react';
import './style.css';

class ChordStrip extends Component {
    constructor(props) {
        super(props);
        this.setupStyle = {
            width: this.props.size
        };
    }

    render() {
        return (
            <div className={`ChordStrip ${this.props.active && 'ChordStrip--active'}`} {...this.props.events} style={this.setupStyle}>{this.props.name}</div>
        )
    }
}

export default ChordStrip;