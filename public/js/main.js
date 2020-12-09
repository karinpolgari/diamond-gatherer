// import {Animal}  from '/js/animal.js';

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

// var width = canvas.width;
// var height = canvas.height;

//  ctx.fillStyle = "pink";
//  ctx.fillRect(280, 20, 40, 20);

//  const betty = new Image();
// betty.src = 'assets/betty.png';
//  const BETTY_WIDTH= 45;
//  const BETTY_HEIGHT =45;
//  let bettyX = 100;
//  let bettyY = 100;




// betty.onload = () => {
//      ctx.drawImage(betty, 0 * BETTY_WIDTH , 0 * BETTY_HEIGHT, BETTY_WIDTH, BETTY_HEIGHT, 100, 100, BETTY_WIDTH, BETTY_HEIGHT )
//  }

//  const dante = new Image();
//  dante.src = 'assets/dante.png';
//  const DANTE_WIDTH= 45;
//  const DANTE_HEIGHT =45;
//  let danteX = 0;
//  let danteY = 0;

// dante.onload = () => {
//      ctx.drawImage(dante, 0 * DANTE_WIDTH , 0 * DANTE_HEIGHT, DANTE_WIDTH, DANTE_HEIGHT, 0 , 0, DANTE_WIDTH, DANTE_HEIGHT )
//  }

//  document.addEventListener("keydown", function(event) {
//      ctx.clearRect(0, 0, 600 , 400);
//      switch(event.key)
//      {
//          case 'ArrowUp':
//              {  if( bettyY - 10 >= 0 )
//                 {
//                  bettyY -= 10;
                 
//                 }
//                  break;
//              }
//         case 'ArrowDown':
//              {
//                 if(bettyY + 10 < height - BETTY_HEIGHT)
//                 {

//                  bettyY += 10;
//                 }
//                  break;
//              }
//         case 'ArrowLeft':
//                 {
//                     if (bettyX - 10 >0)
//                     {
//                          bettyX -= 10;
//                     }
                   
//                     break;
//                 }
//         case 'ArrowRight':
//                     {
//                         if (bettyX + 10 <  width - BETTY_WIDTH)
//                         {
//                             bettyX += 10;
//                         }
                        
//                         break;
//                     }
//      }

//      ctx.drawImage(dante, 0 * DANTE_WIDTH , 0 * DANTE_HEIGHT, DANTE_WIDTH, DANTE_HEIGHT, 0,0, DANTE_WIDTH, DANTE_HEIGHT )
//      ctx.drawImage(betty, 0 * BETTY_WIDTH , 0 * BETTY_HEIGHT, BETTY_WIDTH, BETTY_HEIGHT, bettyX, bettyY, BETTY_WIDTH, BETTY_HEIGHT )
//  })

//  document.addEventListener("keydown", function(event) {
//     ctx.clearRect(0, 0, 600 , 400);
//     switch(event.key)
//     {
//         case 'w':
//             {
//                 if (danteY - 10 > 0)
//                 {
//                     danteY -= 10;
//                 }
                
//                 break;
//             }
//        case 's':
//             {
//                 if (danteY + 10 < height - DANTE_HEIGHT)
//                 {

//                 danteY += 10;
//                 }
//                 break;
//             }
//        case 'a':
//                {
//                 if (danteX - 10 > 0)
//                 {
//                    danteX -= 10;
//                    }                   
//                 break;
//                }
//        case 'd':
//                    {
//                     if (danteX + 10 < width - DANTE_WIDTH)
//                     {
//                        danteX += 10;
//                     }
//                        break;
//                    }
//     }

//     ctx.drawImage(dante, 0 * DANTE_WIDTH , 0 * DANTE_HEIGHT, DANTE_WIDTH, DANTE_HEIGHT, danteX , danteY, DANTE_WIDTH, DANTE_HEIGHT )
//     ctx.drawImage(betty, 0 * BETTY_WIDTH , 0 * BETTY_HEIGHT, BETTY_WIDTH, BETTY_HEIGHT, bettyX, bettyY, BETTY_WIDTH, BETTY_HEIGHT )
// })

const socket = io();
document.getElementById("join-chat-button").addEventListener('click', function() {
const input = document.getElementById("user-name-input");
const userName = input.value;



if (userName.length > 0){

document.getElementById('user-name-missing').classList.add('display-none');
socket.emit('join-chat', userName);

}else
{
document.getElementById('user-name-missing').classList.remove('display-none');
}
})
var usersn = 0;
var exist = 0;

socket.on('joined-chat', function(userName) {
    console.log('You joined chat');
    // usersn += 1;
    // exist = 1;
    // console.log(exist);
    // console.log(usersn);

    document.getElementById('menu').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
    const messageC = document.getElementById('chat-messages');
    const messageE = document.createElement('p');
    
    messageE.innerHTML = userName;
    messageC.appendChild(messageE);
    
})

// socket.on('show', function(users){
//     const s = document.getElementById('showUsersN');
//     const show = document.createElement('p');
    
//     show.innerHTML = users + ' users online.';
//     console.log(users);
//     s.appendChild(show);
//     })
// socket.on('showUsers', function(usersn){
    
//     if ( exist == 0){
//     const usersContainer = document.getElementById('showUsersN');
//     const show = document.createElement('p');
//     show.innerHTML ='Number of online users:' + usersn;
    
//     usersContainer.appendChild(show);
//     }else{
//         document.getElementById('showUsersN').innerHTML = 'Number of online users:' + usersn;

//     }
// })

document.getElementById("send-message-button").addEventListener('click', function() {
    const input = document.getElementById("message");
    const message = input.value;
    socket.emit('send-message', message);
    document.getElementById('message').value = '';
})

socket.on('new-message', function(options) {
    const inputcolor = document.getElementById('pick-color');
    const colorcode = inputcolor.value;
    console.log(colorcode);
    
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    const mess = document.createElement('span');
    messageElement.innerHTML = options.user + ': ';
    mess.innerHTML = options.message;
    
    mess.style.color = colorcode;
   
    messageElement.appendChild(mess);
    messagesContainer.appendChild(messageElement);
})
document.getElementById('leave-chat-button').addEventListener('click', function() {
    socket.emit('leave-chat');
})

socket.on('left-message', function(userName){
const l = document.getElementById('chat-messages');
const messagel = document.createElement('p');

messagel.innerHTML = userName + ' left chat.';
console.log(userName);
l.appendChild(messagel);
})

document.getElementById('leave-chat-button').addEventListener('click', function() {
     
})


socket.on('menu', function() {
    console.log('You left chat');

    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
})



document.getElementById("create-game-button").addEventListener('click', function() {
    const input = document.getElementById("game-name-input");
    const gameName = input.value;
    
    if (gameName.length > 0){
    
    document.getElementById('game-name-missing').classList.add('display-none');
    socket.emit('create-game', gameName);
    }else
    {
    document.getElementById('game-name-missing').classList.remove('display-none');
    }
    })

    socket.on('game-loop', function(objectsForDraw) {
        document.getElementById('menu').classList.add('display-none');
        document.getElementById('game-container').classList.remove('display-none');
        ctx.drawImage(document.getElementById('map-image'), 0, 0); // desenata de 60 ori pe sec

        objectsForDraw.forEach(function (objectForDraw) {
            ctx.drawImage(
                document.getElementById(objectForDraw.imageId),
                ...objectForDraw.drawImageParameters //... ins destructering, descompune un array in cazul de fata
            )
        })

    })
    // tema 3
   var counter = 0;
    var c = 0;
    
    
    document.getElementById("counter-button").addEventListener('click', function() {

        counter += 1;
        c = 1;
        socket.emit('count', counter);
    })
    
    socket.on('new-counter', function(counter) {
        
        if (counter == 1){
        const counterContainer = document.getElementById('show-counter');
        const showCounter = document.createElement('p');
        showCounter.innerHTML = 'The actual counter value is: ' + counter;
        counterContainer.appendChild(showCounter); 
        } else{

            document.getElementById('show-counter').innerHTML = 'The actual counter value is:' + counter;
        }
        
    })

    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case 'ArrowUp':
                socket.emit('start-moving-player', 'up'); //tr catre backend
                break;
            case 'ArrowDown': {
                socket.emit('start-moving-player', 'down');
                break;
            }
            case 'ArrowLeft': {
                socket.emit('start-moving-player', 'left');
                break;
            }
            case 'ArrowRight': {
                socket.emit('start-moving-player', 'right');
                break;
            }
        }
    })
    
    document.addEventListener('keyup', function(event) {
        switch(event.key) {
            case 'ArrowUp': //nu punem break pt ca ambele sunt pe axa Y, indif de tasta vrem sa se opreasca 
            case 'ArrowDown':
                socket.emit('stop-moving-player', 'dy');
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                socket.emit('stop-moving-player', 'dx');
                break;
        }
    })
    
    socket.on('add-game-to-list', function (options) { //opt e obiectul ce contine numele si id ul jocului
        const gameElementContainer = document.createElement('div');
        gameElementContainer.classList.add('game-element');
        gameElementContainer.id = options.gameId;
    
        const gameNameElement = document.createElement('p');
        gameNameElement.innerHTML = options.gameName;
        const joinGameButton = document.createElement('button');
        joinGameButton.innerHTML = 'Join Game!';
    
        joinGameButton.addEventListener('click', function () {
            socket.emit('join-game', options.gameId);
        })
    
        gameElementContainer.appendChild(gameNameElement);
        gameElementContainer.appendChild(joinGameButton);
    
        document.getElementById('game-list').appendChild(gameElementContainer);
    })
    
    socket.on('remove-game-from-list', function (gameId) {
        document.getElementById(gameId).classList.add('display-none');
    })
    
    socket.on('game-over', function (reason) {
        console.log('Game Over', reason);
        ctx.font="120px Lucia Console";
        ctx.fillStyle = "pink";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);

        const container = document.getElementById('home');
        const elem = document.createElement('button');
        elem.innerHTML = 'Back to menu';

        container.appendChild(elem);

        elem.addEventListener('click' , function(){
            document.getElementById('menu').classList.remove('display-none');
            document.getElementById('game-container').classList.add('display-none');
            elem.classList.add('display-none');

        })
    })
    
    // socket.on('new-style', function (colorcode){
    //   message.style.color = colorcode;
    // })
    // console.log(message);
    // var m= message;
    // console.log(m);
    // var chars = m.split('');
    // console.log(chars);
    // var lm = chars.length;
    // console.log(lm);
    // var j=0;
    
    // for ( var i=0; i < lm ;i++)
    // { 
    //     console.log(i + 'i este');
    //     j++;
    //     if (chars[i]===':'){
    //        break;
    //     }
       
    //     console.log(j);
    // }
    // chars.splice(0,j);
    // chars.style.color = colorcode;
    // const inputcolor = document.getElementById('pick-color');
    // const colorcode = inputcolor.value;
    // console.log(colorcode);
    // const mtext = document.getElementById('message').innerHTML;
    // console.log(mtext);
    // inputcolor.addEventListener('change', function () {
    //     mtext.style.color = this.value;
    // })