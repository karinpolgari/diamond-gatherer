import {Animal}  from './animal.js';

const canvas = document.getElementById("canvasId");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');



 ctx.fillStyle = "pink";
 ctx.fillRect(280, 20, 40, 20);

 const betty = new Image();
betty.src = 'assets/betty.png';
 const BETTY_WIDTH= 45;
 const BETTY_HEIGHT =50;
 let bettyX = 100;
 let bettyY = 100;

betty.onload = () => {
     ctx.drawImage(betty, 0 * BETTY_WIDTH , 0 * BETTY_HEIGHT, BETTY_WIDTH, BETTY_HEIGHT, 100, 100, BETTY_WIDTH, BETTY_HEIGHT )
 }

 const dante = new Image();
 dante.src = 'assets/dante.png';
 const DANTE_WIDTH= 45;
 const DANTE_HEIGHT =50;
 let danteX = 0;
 let danteY = 0;

dante.onload = () => {
     ctx.drawImage(dante, 0 * DANTE_WIDTH , 0 * DANTE_HEIGHT, DANTE_WIDTH, DANTE_HEIGHT, 0 , 0, DANTE_WIDTH, DANTE_HEIGHT )
 }

 document.addEventListener("keydown", function(event) {
     ctx.clearRect(0, 0, 600 , 400);
     switch(event.key)
     {
         case 'ArrowUp':
             {
                 bettyY -= 10;
                 break;
             }
        case 'ArrowDown':
             {
                 bettyY += 10;
                 break;
             }
        case 'ArrowLeft':
                {
                    bettyX -= 10;
                    break;
                }
        case 'ArrowRight':
                    {
                        bettyX += 10;
                        break;
                    }
     }

     ctx.drawImage(dante, 0 * DANTE_WIDTH , 0 * DANTE_HEIGHT, DANTE_WIDTH, DANTE_HEIGHT, 0,0, DANTE_WIDTH, DANTE_HEIGHT )
     ctx.drawImage(betty, 0 * BETTY_WIDTH , 0 * BETTY_HEIGHT, BETTY_WIDTH, BETTY_HEIGHT, bettyX, bettyY, BETTY_WIDTH, BETTY_HEIGHT )
 })

 document.addEventListener("keydown", function(event) {
    ctx.clearRect(0, 0, 600 , 400);
    switch(event.key)
    {
        case 'w':
            {
                danteY -= 10;
                break;
            }
       case 's':
            {
                danteY += 10;
                break;
            }
       case 'a':
               {
                   danteX -= 10;
                   break;
               }
       case 'd':
                   {
                       danteX += 10;
                       break;
                   }
    }

    ctx.drawImage(dante, 0 * DANTE_WIDTH , 0 * DANTE_HEIGHT, DANTE_WIDTH, DANTE_HEIGHT, danteX , danteY, DANTE_WIDTH, DANTE_HEIGHT )
    ctx.drawImage(betty, 0 * BETTY_WIDTH , 0 * BETTY_HEIGHT, BETTY_WIDTH, BETTY_HEIGHT, bettyX, bettyY, BETTY_WIDTH, BETTY_HEIGHT )
})