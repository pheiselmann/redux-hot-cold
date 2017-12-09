import React from 'react';
import { shallow, mount } from 'enzyme';

import {GuessForm} from './guess-form';
import {makeGuess} from '../actions'

describe('<GuessForm />', () => {
  it('Renders without crashing', () => {
    shallow(<GuessForm />);
  });
  
  // full DOM rendering
  it('Should dispatch onMakeGuess when the form is submitted', () => {
    // jest method makes a 'spy', which keeps a record of each time called
    const dispatch = jest.fn();
    // mount method renders component, passing spy as onMakeGuess prop
    const wrapper = mount(<GuessForm dispatch={dispatch} />);
    // create arbitray guess
    const value = 10;
    // find input in component and set it to guess value
    wrapper.find('input[type="number"]').instance().value = value;
    // perform onSubmit function with this guess value
    wrapper.simulate('submit');
    // check to see that the spy was called with the guess value
    expect(dispatch).toHaveBeenCalledWith(makeGuess(value.toString()));
  });

  // check to make sure final line of onSubmit function resets input value to ''
  it('Should reset the input when the form is submitted', () => {
    // mount method renders component
    const wrapper = mount(<GuessForm dispatch={() => {}} />);    
    // seems to be another way of using instance method to set guess value of input
    // compare with analogous operations above
    const input = wrapper.find('input[type="number"]');
    input.instance().value = 10;
    wrapper.simulate('submit');
    expect(input.instance().value).toEqual('');
  });
});