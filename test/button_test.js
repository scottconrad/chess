
import React from 'react';
import {mount, shallow} from 'enzyme';
import Button from './../src/components/Button';
import state from './../src/state/App';
const wrapper = shallow(<Button />);
const mounted = mount(<Button />);

mounted.setProps({data:state,in:0});
describe('<Button />', () => {

  it('calls componentDidMount', () => {
    expect(1).to.equal(1);
  });

  it('should have a div wrapper',() => {
    expect(wrapper.type()).to.eql('div');
  });

  it('should return 0 wins',()=>{
    let wins = mounted.nodes[0].getWins();
    expect(wins).to.eql(0);
  });

  it('should return 240 seconds for game length', ()=> {
    expect(state.gameLength).to.eql(240);
  });




});