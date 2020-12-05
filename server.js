 const express = require('express');
 const app = express();
 const http = require ('http').createServer(app);
 const io = require('socket.io')(http);

 const Game = require('./models/game');

 const usersn = 0;
 const exist = 0 ;


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

    socket.on('join-chat', function(userName){
        console.log('[USER JOINED CHAT]', socket.id, userName);
        chatUsers[socket.id] = userName;
        socket.join('chat');
        socket.emit('joined-chat');
    })
    socket.on('send-message', function (message) {
        console.log('[USER SENT MESSAGE]', message);
                io.to('chat').emit('new-message', `${chatUsers[socket.id]}: ${message}`);
    })
    // socket.on('chcolor', function(colorcode){
    //   console.log('[USER COLOR IS: ]' , colorcode);
    //   colorU[socket.id] = colorcode;
    //   // socket.emit('changecolor');
    //   io.to('chat').emit('new-style', ` ${message}` )
    //     })

    socket.on('leave-chat', function() {
        console.log('[USER LEFT CHAT]', socket.id);
        delete chatUsers[socket.id]; //sterge cheia respectiva
        socket.leave('chat');
        socket.emit('menu');
    })

    socket.on('create-game', function(gameName) {
        console.log('[NEW GAME CREATED]');
        const gameId = 'game-' + socket.id;
        const players = [new Player()];
        const game = new Game({ //tr un param de tip obiect in loc de ex 5 param
            id: gameId,
            players: players
        });
        games[gameId] = game; // ca sa il putem accesa si in gameloop
        console.log('User joined' + gameId + ' room');
        socket.join(gameId);

    })
    //tema 3
      socket.on('count', function(counter) {
          console.log('[ACTUAL COUNTER IS:]', counter);
          io.emit('new-counter', `${counter}`);
      });

      socket.on('users', function(usersn) {
        console.log('[NO OF ONLINE USERS IS :]', usersn);
        io.emit('showUsers', `${usersn}`);
    });


})

// class Player {
//     constructor() {
//       this.x = 80;
//       this.y = 127;
//       this.dx = 0;
//       this.dy = 0;
//       this.imageId = 'space-ranger';
//       this.direction = 'down';
//       this.imageStartPoints = {
//         right: [ 193, 225 ],
//         left: [131, 161],
//         down: [65, 98],
//         up: [0, 33]
//       };
//     }
  
//     forDraw() {
//       return {
//         imageId: this.imageId,
//         drawImageParameters: [
//           this.imageStartPoints[this.direction][0],
//           0,
//           PLAYER_DIM,
//           PLAYER_DIM,
//           this.x, //unde se afla acum dx si dy
//           this.y,
//           PLAYER_DIM,
//           PLAYER_DIM
//         ]
//       }
//     }
//   }

// class Game{
//     constructor(options){
//         this.id = options.id
//         this.players = options.players
//         this.start();
//     }
//     start(){
//         const that = this; //pt ca era this id mai jos si nu se ref la instanta jocului, ca nu e un arrow function
//         // aceasta a fost asignata aici si o sa se ref mereu la instanta jocului
//         setInterval(function () {gameLoop(that.id)}, 1000/60); //fct care se repeta pe sec de x ori, 60 refresh pe sec
//     //setinterv primeste ca prim param o fct, de aia punem fct anonima in int careia apelam fct gloop
//     }
// }

function gameLoop(id){ //pt a tr constat catre utiliz date, gen unde se afla playeru, cate diamante sunt etc
  const objectsForDraw = [];
  games[id].players.forEach(function (player) {
    objectsForDraw.push(player.forDraw());
  })
  io.to(id).emit('game-loop', objectsForDraw);
}

const chatUsers = {};
const games = {};
const players = {};

module.exports.gameLoop = gameLoop;


