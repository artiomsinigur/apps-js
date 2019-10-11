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

// Load images
let imgFood = new Image();
imgFood.src = "img/food.png";
let imgGround = new Image();
imgGround.src = "img/ground.png";

// Load audios 
let audioDead = new Audio();
audioDead.src = "audio/dead.mp3";
let audioEat = new Audio();
audioEat.src = "audio/eat.mp3";

// Move snake
let snake = [];
snake[0] = {x: 9*box, y: 10*box};

// Place food randomly
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};
let score = 0;


// Controle the snake and get the code of key arrows
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

    // Add new head
    let newHead = {
        x:snakeHeadX,
        y:snakeHeadY
    };

    // When snake eats food
    // If snake head is in the same position of the food
        // 1. Increment the score
        // 2. Generate new random food
        // 3. Add new head without delete one snake.pop()
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        score++;
        audioEat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
        // When snake eats, don't remove the tail
    } else {
        // Remove the tail
        snake.pop();
    }

    // Game over
        // 1. If snake hits him self
        // 2. If snake hits the wall
    if (collisionHimSelf( newHead, snake ) || collisionWall( newHead )) {
        audioDead.play();
        clearInterval(game);
    }
    
    // Add new head
    snake.unshift(newHead);
}
let game = setInterval(draw, 100);


/**
 * Check if snake hits him self
 */
function collisionHimSelf( head, arrSnake ) {
    for (let i = 0; i < arrSnake.length; i++) {
        if (head.x == arrSnake[i].x && head.y == arrSnake[i].y) {
            return true;
        }
    }
    return false;
}


/**
 * Check if snake hits a wall 
 */
function collisionWall( head ) {
    if (head.x < box || head.y < 3*box || head.x > 17*box || head.y > 17*box) {
        return true; 
    } else {
        return false;
    }
}