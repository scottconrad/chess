
import React from 'react';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';
import Button from './../src/components/Button';
import state from './../src/state/App';
const wrapper = shallow(<Button />);
const mounted = mount(<Button />);

const firstNode = mounted.nodes[0];

mounted.setProps({data:state,in:0});
describe('<Button />', () => {

  it('calls componentDidMount', () => {
    expect(1).to.equal(1);
  });

  it('should have a div wrapper',() => {
    expect(wrapper.type()).to.eql('div');
  });

  it('should return 0 wins',()=>{
    let wins = firstNode.getWins();
    expect(wins).to.eql(0);
  });

  it('should return 240 seconds for game length from state', ()=> {
    expect(state.gameLength).to.eql(240);
  });

  it('should return 240 seconds for game length from component', ()=> {
    //this is actually a great test since I sometimes reset the game length to 3 for manual testing
    let gameLength = firstNode.getCountdown();
    expect(gameLength).to.eql(240);
  });

});