 const express = require('express');
 const app = express();
 const http = require ('http').createServer(app);
 const io = require('socket.io')(http);

 const SpaceRanger = require('./models/space_ranger'); //o const prin care cerem clasa
 const PinkLady = require('./models/pink_lady');
 const Game = require('./models/game');


//  const usersn = 0;
//  const exist = 0 ;


 http.listen(5000, function() {
     console.log('[SERVER STARTED AT PORT 5000]');
 })
 app.get('/', function(request,response) {
     console.log(__dirname);
    response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('[SOCKET CONNECTED]' + socket.id);
    socket.join('menu'); //add la menu chiar cand se con
    Object.keys(games).forEach(function (gameId) { //ch din game sunt cheile, sa apara toate jocurile create cand se con unul nou 
      if (games[gameId].players.length === 1) {
        socket.emit('add-game-to-list', { gameName: games[gameId].name, gameId: gameId })
      }
    })

    socket.on('join-chat', function(userName){
        console.log('[USER JOINED CHAT]', socket.id, userName);
        chatUsers[socket.id] = userName;
        socket.join('chat');
        // socket.emit('joined-chat'); 
        // console.log(chatUsers);
        // chatUsers.update();
        // users.update();
        io.to('chat').emit('joined-chat', `${chatUsers[socket.id]} joined chat.`);
        // io.to('chat').emit('show', users );


    })
    socket.on('send-message', function (message) {
        console.log('[USER SENT MESSAGE]', message);
                io.to('chat').emit('new-message', {user: chatUsers[socket.id], message: message});
    })
    // socket.on('chcolor', function(colorcode){
    //   console.log('[USER COLOR IS: ]' , colorcode);
    //   colorU[socket.id] = colorcode;
    //   // socket.emit('changecolor');
    //   io.to('chat').emit('new-style', ` ${message}` )
    //     })

    // socket.on('mes', function(){
    //   chatUsers[socket.id] = userName;
    //   
    // })

    socket.on('leave-chat', function() {
        console.log('[USER LEFT CHAT]', socket.id);
         u = chatUsers[socket.id];
        delete chatUsers[socket.id]; //sterge cheia respectiva
        
        io.to('chat').emit('left-message', u);
        socket.leave('chat');
        socket.emit('menu');
        
    })

    
  socket.on('create-game', function (gameName) {
    console.log('[NEW GAME CREATED]');
    const gameId = 'game-' + socket.id;
    players[socket.id] = new SpaceRanger({ gameId: gameId, socketId: socket.id });
    const game = new Game({
      id: gameId,
      players: [players[socket.id]],
      name: gameName
    });
    games[gameId] = game;
    console.log('[User joined ' + gameId + '] room');
    socket.join(gameId);
    io.to('menu').emit('add-game-to-list', { gameName: gameName, gameId: gameId })
  })

    
    //tema 3
      socket.on('count', function(counter) {
          console.log('[ACTUAL COUNTER IS:]', counter);
          io.to('menu').emit('new-counter', `${counter}`);
      });

    //   socket.on('users', function(usersn) {
    //     console.log('[NO OF ONLINE USERS IS :]', usersn);
    //     io.emit('showUsers', `${usersn}`);
    // });

  
    //curs 4
    socket.on('start-moving-player', function (direction) {//callback cu param directie
      if (players[socket.id]) { //numai daca E
        players[socket.id].startMoving(direction); //apeleaza metoda start moving din clasa player
        // console.log('[MOVE PLAYER]', direction)
      }
    })
  
    socket.on('stop-moving-player', function (axis) {
      if (players[socket.id]) {
        players[socket.id].stopMoving(axis);
        // console.log('[STOP PLAYER]', axis)
      }
    })
  
    socket.on('join-game', function (gameId) {
      console.log(`[SOCKET ${socket.id} JOINED GAME ${gameId}]`);
      players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id  });
      games[gameId].players.push(players[socket.id]); //add in games playerul creat
      socket.join(gameId); //add socket in camera respectiva a jocului
      io.to('menu').emit('remove-game-from-list', gameId); //cand cnv da join se apel remove si se tr id ul
    })
  
    socket.on('disconnect', function () {
      console.log(`[SOCKET ${socket.id} DISCONNECTED]`);
      if (players[socket.id]) {
        const gameId = players[socket.id].gameId;
        const game = games[gameId];
        const playersToRemoveIds = game.players(function (player) { //map trece prin fiecare element si il modif, dar ramane neschimbat,doar afi
          return player.socketId;
        })
        clearInterval(game.interval);
        delete games[gameId];
        playersToRemoveIds.forEach(function (playerToRemoveId) {
          delete players[playerToRemoveId];
        })
        io.to(gameId).emit('game-over', 'A player disconnected');
      }
    })
  })

  function gameLoop(id) {
    if (games[id]) {
      games[id].update();
      const objectsForDraw = [];
      games[id].players.forEach(function (player) {
        objectsForDraw.push(player.forDraw());
      })
      io.to(id).emit('game-loop', objectsForDraw);
    }
  }
  
  const chatUsers = {};
  const games = {};
  const players = {};
  // const users = chatUsers.length;

  module.exports.gameLoop = gameLoop;