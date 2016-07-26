##Run
To run, cd to this directory, then run:
<code>
 npm install
</code>
Verify that your node_modules folder exists, then run "npm start" for hot reloading. for build, run "npm build", per the package.json  This didn't generate a file for me, so it might be a bug in Dan's code.

I wrote this without using redux, though this was a prime use case for using it.  I thought about an excuse to try out mobx, but again decided against any sort of state management helper.

I kept the state management pretty clean, and I met the requirements for useable code with making each button and it's surrounding html its own component. To take this further, I could have written the buttons as components, it just depends on how much you want to abstract away while potentially sacrificing readability and understanding of the code.

By structuring the store with an array of players, that did make the state management more complex than it needed to be. Instead, knowing I would only ever have two players, I could have written each into the state, but I felt it was better to demonstrate mapping over the  with state to generate components and making the code theoretically work with additional players with some additional modifications(wins would be assigned to multiple additional players currently, which is outside of the scope of requirements).

For quick debugging, I went ahead and abstracted out the gamelength from the state and put it as a constant. This also allows Javier to test it easily without having to wait 4 minutes.  Update src/state/App.js gamelength to 30 or something more reasonable if you are short on patience.

To use the built in server from npm, run:

<code>
npm install -g http-server
</code>

change directory to build, then run:

<code>
hs
</code>

You should see:

<code>
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.1.5:8080
  http://192.168.33.1:8080
</code>

open [link](http://127.0.0.1:8080)

###What I would change:
I'd try out mobx to see how cool that really is, I hear a lot of good things about it.
I'd also use the spread operator [here](http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html) but I've found it is hard for people to grok.

