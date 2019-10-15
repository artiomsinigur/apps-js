// import {Z} from './tetrominoes.js';
// import * as myModule from './tetrominoes.js';
// import isDefault from './tetrominoes.js';
// import isDefault, * as myModule from './tetrominoes.js';
// import('./tetrominoes.js').then((myModule) => {
//     console.log(myModule.sayHello('Annie'));
// });

const ctx = document.getElementById("tetris").getContext("2d");
let score = document.getElementById("score");

const SQ = 20; // SQUARESIZE

/**
 * Draw a square
 * @param {Number of square from the left} x 
 * @param {Number of square from the top} y 
 * @param {Color of the square} color 
 */
function drawSquare( x, y, color ) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);

    ctx.strokeStyle = "gray";
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

// Game board
    // Create the bord/array
const ROW = 20;
const COLUMN = 10;
const VACANT = "white";
let board = [];

for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COLUMN; c++) {
        board[r][c] = VACANT;
    }
}

/**
 * Draw the board
 */
function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COLUMN; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}
drawBoard();

drawSquare(5,18, "red");