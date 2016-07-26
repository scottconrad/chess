import React from 'react';

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
  updatePlayer(data){
    //get the player in the state
    this.props.data.players.map((item,idx) => {
      if(idx === this.getIndex()) return null;
      if(item.timer){
        //we have a timer so we clear it
        clearInterval(item.timer);
        //i am not sure if this is necessary
        item.timer = null;
      }
      return item;
    });
    let player = this.getPlayer();
    let updatedPlayerObject = this.props.data.players;
    updatedPlayerObject[this.getIndex()] = Object.assign({},player,data);
    this.setState(Object.assign({},this.props.data,{players:updatedPlayerObject}));
  },
  startTimer(){
    //set the timer, assign it to the player
    const timer = setInterval(()=>{
      let timeLeft = this.getPlayer().timeLeft - 1;
      this.updatePlayer({timeLeft: timeLeft});
      if(timeLeft === 0){ //the other player(s) should get a win
        this.updateScore(this.getIndex());
        this.stopTimer();
      }
    },1000);
    this.updatePlayer({timer: timer});
  },
  stopTimer(){
    clearInterval(this.getPlayer().timer);
  },
  stopAllTimers(){
    this.props.data.players.map((player)=>{
      if(player.timer){
        clearInterval(player.timer);
        player.timer = null;
      }
      return player;
    });
  },
  getIndex(){
    //the radix thing is kind of cool, good linting
    return parseInt(this.props.in, 10);
  },
  updateScore(idx){
    this.props.data.players.map((item,index)=>{
      if(index !== idx){
        item.wins += 1;
      }
      item.timeLeft = this.props.data.gameLength;
      return item;
    });
    this.refresh();
  },
  getWins(){
    //our state might not be set, so we return 0 if we don't have the player object
    if(!this.getPlayer()) return 0;
    return this.getPlayer().wins;
  },
  getPlayer(){
    if (!this.props || !this.props.data || !this.props.data.players) return {};
    return this.props.data.players[this.getIndex()];
  },
  getPlayerName(){
    const player = this.getPlayer();
    return player ? player.name : '';
  },
  refresh(){
    //force update on this component
    this.forceUpdate();
    //force the parent component to update
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
        <button onClick={this.handlePlayerClick}>{this.getPlayerName()}</button>
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