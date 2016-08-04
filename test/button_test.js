
import React from 'react';
import {mount, shallow} from 'enzyme';
import Button from './../src/components/Button';

describe('<Button />', () => {

  it('calls componentDidMount', () => {
    expect(1).to.equal(1);
  });

  it('should have a div warpper',() => {
    const wrapper = shallow(<Button />);
    const mounted = mount(<Button />);
    console.log(mounted);
    expect(wrapper.type()).to.eql('div');
  });
});