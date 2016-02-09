// NODE
import http from 'http';
import path from 'path';

// EXPRESS
import express from 'express';
import favicon from 'serve-favicon';

// JOHNNY-FIVE
import five from 'johnny-five';
import socket from 'socket.io';

let ledOne, ledTwo, ledThree, playerOne, playerTwo, playerThree;
let board = new five.Board({port: '/dev/cu.usbmodem1411'});


board.on("ready", function() {
  console.log("board is ready")

  ledOne = new five.Led(3);
  ledTwo = new five.Led(6);
  ledThree = new five.Led(9);

  playerOne = new five.Button(2);
  playerTwo = new five.Button(5);
  playerThree = new five.Button(8);

  board.repl.inject({
    playerOne: playerOne,
    playerTwo: playerTwo,
    playerThree: playerThree,
  });

});


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

let server = http.createServer(app).listen(app.get('port'), () => {
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
// socket.io config
let io = socket(server);

// on a socket connection
io.sockets.on('connection', function (socket) {

  // if board is ready
  if(board.isReady){

    // Player Buttons
    playerOne.on("up", function() {
      socket.emit('rec', {player: 1});
    });
    playerTwo.on("up", function() {
      socket.emit('rec', {player: 2});
    });

    playerThree.on("up", function() {
      socket.emit('rec', {player: 3});
    });


    // Player Button LEDs
    // strobe
    socket.on('led-strobe-1', function () {
      ledOne.strobe();
    });

    socket.on('led-strobe-2', function () {
      ledTwo.strobe();
    });

    socket.on('led-strobe-3', function () {
      ledThree.strobe();
    });

    // on
    socket.on('led-on-1', function () {
      ledOne.on();
    });

    socket.on('led-on-2', function () {
      ledTwo.on();
    });

    socket.on('led-on-3', function () {
      ledThree.on();
    });

    // off
    socket.on('led-off-1', function () {
      ledOne.off();
    });

    socket.on('led-off-2', function () {
      ledTwo.off();
    });

    socket.on('led-off-3', function () {
      ledThree.off();
    });


    // All LED Strobe
    socket.on("led-strobe-all", function () {
      ledOne.strobe(210);
      setTimeout(function() {
        ledTwo.strobe(210)
      }, 70);
      setTimeout(function() {
        ledThree.strobe(210)
      }, 140);
    });


    // LED off
    socket.on('led-stop', function () {
      ledOne.stop().off();
      ledTwo.stop().off();
      ledThree.stop().off();
    });
  }

});
