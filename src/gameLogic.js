import UI from './userInterface.js';
const userInter = new UI();

class GameLogic {
    constructor() {
        this.turn = document.getElementById('turn');

        // buttons
        this.restartBtn = document.querySelector('#restart');

        // logical variables
        this.gameRunning = false;
        this.gameWon = false;
        this.gameDraw = false;
        this.playerTurn = this.turn.getAttribute("data-turn");

        // Stats & Turn
        this.playerTurnSymbol = document.querySelector('.turn-logo');
        this.xScoreCount = document.querySelector('.x-score');
        this.drawScoreCount = document.querySelector('.draw-score');
        this.oScoreCount = document.querySelector('.o-score');

        this.xScore = 0;
        this.drawScore = 0;
        this.oScore = 0;

        // GameBoard
        this.gameBoard = document.getElementById('game-board');
        this.gameSquares = document.querySelectorAll('.game-square'); // cells
    };

    initializeGame() {
        this.gameRunning = true;
        this.gameWon = false;
        this.gameDraw = false;
        this.playerTurn = 'x';
        // scores
        this.xScore = 0;
        this.drawScore = 0;
        this.oScore = 0;
    }


    checkGameState() {
        console.log(`checking game state`);
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Check for winner
        for (let i = 0; i < winningConditions.length; i++) {
            let [a, b, c] = winningConditions[i] // destructuring each index of each iteration in to variables
            let cellA = this.gameSquares[a].firstChild ? this.gameSquares[a].firstChild.getAttribute('src') : null;
            let cellB = this.gameSquares[b].firstChild ? this.gameSquares[b].firstChild.getAttribute('src') : null;
            let cellC = this.gameSquares[c].firstChild ? this.gameSquares[c].firstChild.getAttribute('src') : null;

            if (cellA !== null && cellA === cellB && cellA === cellC) {
                this.gameWon = true;
                this.gameRunning = false;
                this.gameSquares.forEach(square => {
                    if (!square.classList.contains('selected')) {
                        square.classList.add('selected');
                    }
                })

                if (cellA === './assets/icon-x.svg') {
                    this.xScore++;
                    this.xScoreCount.innerText = this.xScore;
                    userInter.handleGameState('X', 'win');
                } else if (cellA === './assets/icon-o.svg') {
                    this.oScore++;
                    this.oScoreCount.innerHTML = this.oScore;
                    userInter.handleGameState('O', 'win');
                };
                break;
            };
        };
       

    };

    checkForDraw() {
        console.log(`checking draw`);

        let allCellsOccupied = true;
   

        for (let i = 0; i < this.gameSquares.length; i++) {
            let cell = this.gameSquares[i].firstChild.getAttribute('src');
            if (cell === '') {
                allCellsOccupied = false;
                break;
            }; 
        };

        if (allCellsOccupied && !this.gameWon) {
            console.log('draw');
            this.drawScore++;
            this.drawScoreCount.innerText = this.drawScore;
            this.gameDraw = true;
            this.gameRunning = false;
            userInter.handleGameState('draw', 'draw');
        };

    };

    // Computer Player
    computerPlayerMove() {
        // array of unselected game squares
        const unSelected  = []
        // loop over all game squares to find unselected
        this.gameSquares.forEach(square => {
            if (!square.classList.contains('selected')) {
                unSelected.push(square);
            }
        });
        // pick random square for cpu move
        if (unSelected.length > 0) {
            // pick random square
            const randomIndex = Math.floor(Math.random() * unSelected.length)
            const cpuMoveElement = unSelected[randomIndex];
            // create new piece
            const newPiece = document.createElement('img');
            // add classes and append
            cpuMoveElement.classList.add('selected');
            newPiece.classList.add('play-piece');
            newPiece.src = './assets/icon-o.svg';
            cpuMoveElement.appendChild(newPiece);
        };
        // set game back to X's turn
        this.turn.setAttribute('data-turn', 'x');
        this.playerTurnSymbol.src = './assets/icon-x.svg';
        // check game state
        if (!this.gameWon) {
            this.checkGameState();
        };
    };

    newRound() {
        this.gameWon = false;
        this.gameDraw = false;

        let whosTurn = this.turn.getAttribute('data-turn');
        this.turn.setAttribute('data-turn', 'x');
        userInter.resetGameBoard();
    };


};

export default GameLogic;