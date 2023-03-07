// Vaiables
const gameBoard = document.getElementById('game-board');
const modalQuitGameBtn = document.querySelector('.quit-btn');
const modalNextRoundBtn = document.querySelector('.next-round-btn');
const startBtn = document.querySelector('.start-game-btn');
const restart = document.querySelector('#restart');

// imports
import GameLogic from "./gameLogic.js";
import UI from './userInterface.js'

// instantiated classes
const gameLogic = new GameLogic();
const ui = new UI();

// EVENT LISTENERS

    // Start Game
startBtn.addEventListener('click', () => {
    gameLogic.initializeGame();
    ui.startGame();
});

    // GAME BOARD EVENT LISTNERS
window.addEventListener('DOMContentLoaded', () => {
    gameLogic.initializeGame();
});

    // Using event delegation - listens for a mouseover event on game board
gameBoard.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('selected')) {
        ui.hoverSquare(e);
    };
});

    // Using event delegation - listens for a click event on game board
gameBoard.addEventListener('click', (e) => {
    ui.selectSquare(e);
    setTimeout(() => {
        gameLogic.computerPlayerMove()
    }, 150);
    gameLogic.checkGameState();
    gameLogic.checkForDraw();
});

    // Restart
restart.addEventListener('click', () => {
    console.log('restart');
    ui.resetGameBoard();
    ui.quitGame();
    gameLogic.initializeGame();
});

    // Using event delegation - listens for a click event on game board

gameBoard.addEventListener('mouseout', (e) => {
    ui.clearHoverState(e);
});    

    // MODAL EVENT LISTENERS
modalQuitGameBtn.addEventListener('click', () => {
    ui.quitGame();
    ui.resetGameBoard();
    gameLogic.initializeGame();
});

modalNextRoundBtn.addEventListener('click', () => {
    ui.nextRound();
    gameLogic.newRound();
});