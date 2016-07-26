const gamelength = 240;
let player = {name: 'Player 1', wins: 0, timeLeft: gamelength,timer:null};
let state = {
  counter:0,
  activeUserIndex:null,
  gameLength:gamelength,
  elapsedTime:0,
  players:[
    Object.assign({},player,{name:'Player 1'}), Object.assign({}, player, {name: 'Player 2'})]
}

export default state;
