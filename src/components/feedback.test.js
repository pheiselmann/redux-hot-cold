import React from 'react';
import {shallow} from 'enzyme';

import {Feedback} from './feedback';

describe('<Feedback />', () => {
  it('Renders without crashing', () => {
    shallow(<Feedback />);
  });

  it('Renders the correct feedback', () => {
    const feedback = "Hot!";
    const wrapper = shallow(<Feedback feedback={feedback} />);
    expect(wrapper.text()).toEqual(`${feedback} Guess again!`);
  });
});