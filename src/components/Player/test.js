import React from 'react';
import ReactDOM from 'react-dom';
import Player from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player />, div);
});
