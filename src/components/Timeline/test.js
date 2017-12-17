import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from './index';

const songEventsMock = [
    {
        beat_time: 10,
        duration: 10,
        name: 'G'
    },
    {
        beat_time: 1,
        duration: 1,
        name: 'D'
    }
]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Timeline songEvents={songEventsMock} />, div);
});
