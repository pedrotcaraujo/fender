import React from 'react';
import ReactDOM from 'react-dom';
import RiffStation from './index';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../Players/Youtube')
jest.mock('../Timeline')

jest.mock('../../utils/proxyFetch');

const proxyFetch = require('../../utils/proxyFetch').default;
proxyFetch.mockImplementation(() => Promise.resolve({
    song: {}
}))

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RiffStation />, div);
});

it('should calls proxyFetch', () => {
    expect(proxyFetch).toHaveBeenCalled();
});

it('should set a song state', () => {
    const wrapper = mount(<RiffStation/>);
    proxyFetch().then(() => {
        expect(wrapper.state()).toEqual({ song: {} })
    })
});