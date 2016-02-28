// NODE
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

const key = fs.readFileSync('./server/key.pem');
const cert = fs.readFileSync('./server/cert.pem');
const https_options = {
    key: key,
    cert: cert
};

// EXPRESS
import express from 'express';
import favicon from 'serve-favicon';

// JOHNNY-FIVE
import { Board, Button, Leds } from 'johnny-five';
import socket from 'socket.io';


// Profile dev or production
let profile = process.env.DEV ? 'dev' : 'prod',
  publicPath = profile === 'dev' ? 'build' : 'dist';

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(publicPath));
app.use(favicon(path.join(__dirname, '../app/images/favicon.ico')));

//
// Register middlewares
// --------------------

// renderer
let renderer = require('./routes/renderer');
// apis
let apiRoutes = require('./routes/api');

//
// Configure middlewares
// --------------------
renderer.init(profile);

//
// Activate middlewares
// --------------------
app.use(apiRoutes);
app.use(renderer.render);

let server = https.createServer(https_options, app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

//
// check if HMR is enabled
// --------------------
if(module.hot) {
  // accept update of dependency
  module.hot.accept(['./routes/api', './routes/renderer'], () => {
    apiRoutes = require('./routes/api');
    app.use(apiRoutes);
    renderer = require('./routes/renderer');
    renderer.init('dev');
  });
}


//
// johnny-five config
let leds, players;
let board = new Board({port: process.env.USB ? process.env.USB :'/dev/cu.usbmodem1411'});

board.on("ready", function() {
  console.log("board is ready")

  leds = new Leds([3, 6, 9]);
  players = [
    new Button(2),
    new Button(5),
    new Button(8),
  ];

  board.repl.inject({
    players: players
  });

});


//
// socket.io config
let io = socket(server);

// on a socket connection
io.sockets.on('connection', function (socket) {

  // if board is ready
  if (board.isReady){

    // Player Buttons
    players.forEach((player, index) => {
      player.on("up", () => socket.emit("rec", { player: index + 1 }));
    });

    // Player Button LEDs
    // on
    socket.on("led-on", (id) => leds[id - 1].on());
    socket.on("led-on-all", () => leds.on());

    // off
    socket.on("led-off", (id) => leds[id - 1].stop().off());
    socket.on("led-off-all", () => leds.stop().off());

    // strobe
    socket.on("led-strobe", (id) => leds[id - 1].strobe());
    socket.on("led-strobe-all", () => {
      leds[0].strobe(210);
      board.wait(70, () => leds[1].strobe(210));
      board.wait(140, () => leds[2].strobe(210));
    });
  }

});
