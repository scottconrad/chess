##Run
To run, cd to this directory, then run npm install.
Verify that your node_modules folder exists, then run "npm start" for hot reloading. for build, run "npm build", per the package.json  This didn't generate a file for me, so it might be a bug in Dan's code.

I wrote this without using redux, though this was a prime use case for using it. I kept the state management pretty clean, and I met the requirements for useable code with making each button and it's surrounding html its own component. To take this further, I could have written the buttons as components, it just depends on how much you want to abstract away sacrificing readability.

By structuring the store with an array of players, that did make the state management more complex than it needed to be. Instead, knowing I would only ever have two players, I could have written each into the state, but I felt it was better to demonstrate mapping over the state to generate components.

For quick debugging, I went ahead and abstracted out the gamelength from the state and put it as a constant. This also allows Javier to test it easily without having to wait 4 minutes.

To use the built in server from npm, run:

```npm install -g http-server


change directory to build, then run:
```hs


It will list urls to view the server, in my case http://127.0.0.1:8080/

Improvements:
* Redux

