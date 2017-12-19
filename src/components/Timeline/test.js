import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timeline from './index';

jest.mock('../../stores/RiffStationStore');

const RiffStationStore = require('../../stores/RiffStationStore').default;
RiffStationStore.addPlayerListener = jest.fn();
RiffStationStore.getPlayerState = jest.fn(() => ({
    current: 'PLAYING',
    time: 30,
    player: {
        seekTo: jest.fn(),
        getCurrentTime: jest.fn(() => Promise.resolve(50))
    }
}))


configure({ adapter: new Adapter() });

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

const wrapper = mount( <Timeline songEvents={songEventsMock} duration={100}/>)

it('should listen player from store', () => {
  expect(RiffStationStore.addPlayerListener).toHaveBeenCalled();
});

it('should calculate timeline wrapper width', () => {
    expect(wrapper.instance().setupStyle.width).toBe('7000px');
});

it('should handle chord click', () => {
    wrapper.instance().syncState();
    wrapper.instance().handleStripClick(null, 10)
    expect(wrapper.state().player.seekTo).toHaveBeenCalledWith(10, true);
});

it('should check current chord ', () => {
    wrapper.instance().syncState();
    const isCurrentTruthy = wrapper.instance().isCurrentChord(25, 10)
    const isCurrentFalsy = wrapper.instance().isCurrentChord(35, 10)

    expect(isCurrentTruthy).toBeTruthy();
    expect(isCurrentFalsy).toBeFalsy();
});

it('should call currentTime in timeline animate', () => {
    wrapper.instance().animate()
    expect(wrapper.state().player.getCurrentTime).toHaveBeenCalled();
});

it('should style by state', () => {
    wrapper.instance().animate() // time === 50

    const style = wrapper.instance().styleByState()
    expect(style).toEqual({
        width: '7000px',
        transform: 'translateX(-3500px)'
    });
});