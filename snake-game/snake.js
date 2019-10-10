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

// Load gound image
// ctx.drawImage(imgName, x, y, width, height);
imgGround.addEventListener("load", () => ctx.drawImage(imgGround, 0, 0));

// Move snake
let snake = [];
    snake[0] = {x: 9*box, y: 10*box};
    snake[1] = {x: 8*box, y: 10*box};

// Place food randomly
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};
let score = 0;


/**
 * Draw the snake
 */
function draw() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(imgFood, food.x, food.y);

    ctx.fillStyle = "white";
    ctx.font = "34px Arial";
    ctx.fillText(score, 2*box, 1.6*box);
}
let game = setInterval(draw, 1000);


