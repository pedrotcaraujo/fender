import React from 'react';
import ReactDOM from 'react-dom';
import ChordStrip from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChordStrip />, div);
});
