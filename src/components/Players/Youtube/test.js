import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Youtube from './index';
import youtubePlayerMock from 'youtube-player';

jest.mock('../../../dispatchers/RiffStationDispatcher');

const RiffStationDispatcher = require('../../../dispatchers/RiffStationDispatcher').default;
RiffStationDispatcher.dispatch = jest.fn();


configure({ adapter: new Adapter() });

const handleMock = jest.fn(() => true);
const wrapper = mount( <Youtube videoId="asd" onReady={handleMock} onStateChange={handleMock}/>)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Youtube/>, div);
});

it('should call youtubePlayer', () => {
  expect(youtubePlayerMock).toHaveBeenCalledWith(wrapper.instance().container)
});

it('should call loadVideoById method from player', () => {
  expect(wrapper.instance().player.loadVideoById).toHaveBeenCalledWith('asd');
});

it('should call on method player', () => {
  expect(wrapper.instance().player.on).toHaveBeenCalled();
});

it('should handle on ready player with props onReady', () => {
  expect(wrapper.instance().onReady()).toBe(true);
});

it('should be called with UNSTARTED', () => {
  const event = {target: 'test', data: -1}
  wrapper.instance().onStateChange(event)

  wrapper.instance().player.getCurrentTime().then(time => {
    expect(RiffStationDispatcher.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_PLAYER',
      data: {current: 'UNSTARTED', time: 10, player: wrapper.instance().player}
    });
  });

});

it('should be called with ENDED ', () => {
  const event = {target: 'test', data: 0}
  wrapper.instance().onStateChange(event)
  
    wrapper.instance().player.getCurrentTime().then(time => {
      expect(RiffStationDispatcher.dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_PLAYER',
        data: {current: 'ENDED', time: 10, player: wrapper.instance().player}
      });
    });
});

it('should be called with PLAYING ', () => {
  const event = {target: 'test', data: 1}
  wrapper.instance().onStateChange(event)
  
    wrapper.instance().player.getCurrentTime().then(time => {
      expect(RiffStationDispatcher.dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_PLAYER',
        data: {current: 'PLAYING', time: 10, player: wrapper.instance().player}
      });
    });
});

it('should be called with PAUSED ', () => {
  const event = {target: 'test', data: 2}
  wrapper.instance().onStateChange(event)
  
    wrapper.instance().player.getCurrentTime().then(time => {
      expect(RiffStationDispatcher.dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_PLAYER',
        data: {current: 'PAUSED', time: 10, player: wrapper.instance().player}
      });
    });
});

it('should be called with BUFFERING ', () => {
  const event = {target: 'test', data: 3}
  wrapper.instance().onStateChange(event)
  
    wrapper.instance().player.getCurrentTime().then(time => {
      expect(RiffStationDispatcher.dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_PLAYER',
        data: {current: 'BUFFERING', time: 10, player: wrapper.instance().player}
      });
    });
});

it('should be called with CUE ', () => {
  const event = {target: 'test', data: 5}
  wrapper.instance().onStateChange(event)
  
    wrapper.instance().player.getCurrentTime().then(time => {
      expect(RiffStationDispatcher.dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_PLAYER',
        data: {current: 'CUE', time: 10, player: wrapper.instance().player}
      });
    });
});