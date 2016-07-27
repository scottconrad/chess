import React from 'react';
import './App.css';
import Button from './components/Button';
import state from './state/App';

let App = React.createClass({
  getInitialState(){
    return state;
  },
  refresh(){
    this.forceUpdate();
  },
  handleResetTimer(){
    let players = [];
    state.players.map((item)=>{
      item.timeLeft = this.state.gameLength;
      if(item.timer){
        clearInterval(item.timer);
        item.timer = null;
      }
      players.push(item);
      return item;
    });
    this.setState(Object.assign({},state,{'players':players}));
    this.refresh();
  },
  render() {
    //i need this intermediary variable here due to => not getting back to this since it is inside of the ()'s
    const refresh = this.refresh;
    return (
      <div className="App">
        <div className="center-text"><h2>Chess</h2>
          {
            state.players.map((item,idx) => {
              return (
                <div key={idx} className="column" ><Button in={idx} refresh={refresh} data={state} /></div>
              )
            })
          }
          </div>
        <div>
        <button onClick={this.handleResetTimer}>Reset Clock</button>
        </div>
      </div>
    );
  },
});
export default App;