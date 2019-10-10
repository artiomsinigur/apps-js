"use strict";
// https://developer.mozilla.org/fr/docs/Tutoriel_canvas
// https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Animations_basiques
// https://developer.mozilla.org/fr/docs/Web/API/HTMLImageElement/Image
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
// https://developer.mozilla.org/fr/docs/Web/API/FontFace

const ctx = document.getElementById("snake").getContext("2d");
let box = 32; // 32px is one unit(square)
    // Gound area has 17 box on X and 15 box on Y
    // Where X left side has one free unit and Y top side has 3 free units

// Load images and audio 
let imgFood = new Image();
imgFood.src = "img/food.png";
let imgGround = new Image();
imgGround.src = "img/ground.png";

let audioName = new Audio();
audioName.src = "audio/audio.mp3";

// Move snake
let snake = [];
    snake[0] = {x: 9*box, y: 10*box};

// Place food randomly
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};
let score = 0;


// Controle the snake
let d;
document.addEventListener("keydown", direction);
function direction( e ) {
    if (e.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if(e.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if(e.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if(e.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}


/**
 * Draw the snake
 */
function draw() {
    // Load gound image
    // ctx.drawImage(imgName, x, y, width, height);
    ctx.drawImage(imgGround, 0, 0);
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "#82BB4A"; // Where green are the head. Only first index pos
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "#578A34";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(imgFood, food.x, food.y);

    // Write score
    ctx.fillStyle = "white";
    ctx.font = "34px Arial";
    ctx.fillText(score, 2*box, 1.6*box);


    // General rules. How snake move.
        // 1. Remove tail (snake.pop())
        // 2. Add new head (snake.unshift(3))
        // 3. Repeat

    // Get old head postion
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;
    

    // Check the direction
    // If snake moves on the left 
    if (d == "LEFT") snakeHeadX -= box; 
    // If snake moves on the right
    if (d == "RIGHT") snakeHeadX += box;
    // If snake moves on the top 
    if (d == "UP") snakeHeadY -= box;
    // If snake moves on the bottom 
    if (d == "DOWN") snakeHeadY += box;


    // Delete snake tail
    snake.pop();



    // Add new head
    let newHead = {
        x:snakeHeadX,
        y:snakeHeadY
    };

    snake.unshift(newHead);
}
let game = setInterval(draw, 100);

