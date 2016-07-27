import React from 'react';
  let timers = [];
const Button  = React.createClass({
  propTypes:{
    data: React.PropTypes.object,
    idx: React.PropTypes.any,
    refresh: React.PropTypes.func
  },
  getCountdown(){
    //just in case this isn't set
    if(!this.props || !this.props.data) return '';
    return this.getPlayer().timeLeft;
  },
  handlePlayerClick(){
    this.stopAllTimers();
    this.startTimer();
  },
  getOpponentIndex(){
    return this.getIndex() === 1 ? 0 : 1;
  },
  getOpponent(){
    return this.props.data.players[this.getOpponentIndex()];
  },
  updateOpponent(data){
    this.updatePlayer(data,this.getOpponentIndex());
  },
  updatePlayer(data,targetIndex){
    console.log('targetIndex == ',targetIndex);
    let targetedIndex = (targetIndex !== undefined) ? targetIndex : this.getIndex();
    console.log('the targeted index is',targetedIndex);
    let player = this.getPlayer(targetedIndex);
    console.log('player is','updatePlayer',player);
    let updatedPlayerObject = this.props.data.players;
    updatedPlayerObject[targetedIndex] = Object.assign({},player,data);
    this.setState(Object.assign({},this.props.data,{players:updatedPlayerObject}));
  },
  startTimer(){
    this.stopAllTimers();
    //set the timer, assign it to the player
    let timer = setInterval(()=>{
      let timeLeft = this.getOpponent().timeLeft - 1;
      this.updateOpponent({timeLeft: timeLeft});
      if(timeLeft === 0){ //the other player(s) should get a win
        this.updateScore(this.getIndex());
        this.stopAllTimers();
      }
      this.refresh();
    },1000);
    timers.push(timer);
    this.updateOpponent({timer: timer});
  },
  stopTimer(){
    if(this.getPlayer().timer) clearInterval(this.getPlayer().timer);
    this.updatePlayer({timer:null});
  },
  stopAllTimers(){
    timers.forEach(function(item){
      clearInterval(item);
    });
  },
  getIndex(){
    //the radix thing is kind of cool, good linting
    return parseInt(this.props.in, 10);
  },
  updateScore(idx){
    this.stopAllTimers();
    let players = [];
    this.props.data.players.map((item,index)=>{
      if(index === idx){
        item.wins += 1;
      }
      //get the player gamelength back to default
      item.timeLeft = this.props.data.gameLength;
      players.push(item);
      return item;

    });
    this.setState(Object.assign({},this.props.data,{'players':players}));
    //in a perfect world I wouldn't need this
    this.refresh();
  },
  getWins(){
    //our state might not be set, so we return 0 if we don't have the player object
    if(!this.getPlayer()) return 0;
    return this.getPlayer().wins;
  },
  getPlayer(targetedIndex){
    let targetIndex = (targetedIndex !== undefined) ? targetedIndex : this.getIndex();
    if (!this.props || !this.props.data || !this.props.data.players) return {};
    return this.props.data.players[targetIndex];
  },
  getPlayerName(){
    return this.props.name ? this.props.name : '';
  },
  refresh(){
    //force the parent component to update, this is where redux would be nice
    this.props.refresh();
  },
  getMinutes(){
    return Math.floor(this.getPlayer().timeLeft / 60);
  },
  getSeconds(){
    let seconds = this.getPlayer().timeLeft % 60;
    //kind of cheesy
    if(seconds < 10) seconds = '0' + seconds;
    return seconds.toString();
  },
  render(){
    return (
      <div>
        <button onClick={this.handlePlayerClick}>{this.props.name}</button>
        <p>Time Left: {this.getCountdown()} seconds</p>
        <p>{this.getMinutes()}:{this.getSeconds()}</p>
        <p></p>
        <p>
        Wins: <strong>{this.getWins()}</strong></p>
      </div>
    )
  }
});
export default Button;