class UI {
    constructor() {
        // X & O  
        this.imgPiece = document.querySelector('.play-piece');
        this.turn = document.getElementById('turn');
        this.xImg = document.createElement('img');
        this.xImg.classList.add('play-piece');
        this.xImg.classList.add('xImg');
        this.oImg = document.createElement('img');
        this.oImg.classList.add('play-piece');
        this.oImg.classList.add('oImg');

        this.turnIcon = document.querySelector('.turn-logo');

        this.gameBoard = document.getElementById('game-board');

        // score
        this.playerTurnSymbol = document.querySelector('.turn-logo');
        this.xScoreCount = document.querySelector('.x-score');
        this.drawScoreCount = document.querySelector('.draw-score');
        this.oScoreCount = document.querySelector('.o-score');
        
        // modal
        this.modal = document.querySelector('.modal');
        this.modalWinnerPara = document.querySelector('.winner-para');
        this.modalWinnerTitle = document.querySelector('.winner-title');
        this.modalQuitBtn = document.querySelector('.quit-btn');
        this.modalNextRoundBtn = document.querySelector('.next-round-btn');

        // start dashboard
        this.startdashboard = document.querySelector('.start-dashboard');
        this.mainContainer = document.querySelector('.main-container');
    };

    startGame() {
        this.startdashboard.classList.add('hide');
        this.mainContainer.classList.remove('hide');
    };


    hoverSquare(event) {
        // check for game square elements
        if (event.target.classList.contains('game-square')) {
            // used to identify X or O turn
            let currentTurn = this.turn.getAttribute('data-turn');
            // Chooses correct play piece to display
            if (currentTurn === 'x') {
                this.xImg.src = './assets/icon-x-outline.svg';
                event.target.appendChild(this.xImg);
            } else if (currentTurn === 'o') {
                this.oImg.src = './assets/icon-o-outline.svg';
                event.target.appendChild(this.oImg);
            }
        };
    };

    selectSquare(event) {
        // remove previous image before appending permanent piece
        if(event.target.firstChild) {
            event.target.removeChild(event.target.firstChild);
        }

        // add play piece 
        if (event.target.classList.contains('game-square') && !event.target.classList.contains('selected')) {
            let currentTurn = this.turn.getAttribute('data-turn');
            const img = document.createElement('img');
            img.classList.add('play-piece');
            if (currentTurn === 'x') {
                // add X piece
                img.src = './assets/icon-x.svg';
                event.target.appendChild(img);
                // change turns
                this.turn.setAttribute('data-turn', 'o')
                this.turnIcon.src = './assets/icon-o.svg'
            } else if (currentTurn === 'o') {
                // add O piece
                img.src = './assets/icon-o.svg';
                event.target.appendChild(img);
                // change turns
                this.turn.setAttribute('data-turn', 'x')
                this.turnIcon.src = './assets/icon-x.svg'
            }
            event.target.classList.add('selected');
        };
    };

    clearHoverState(event) {

        if (event.target.classList.contains('game-square')) {
            if (event.target.firstChild) {
                if (event.target.firstChild.classList.contains('xImg')) {
                    event.target.firstChild.remove();
                  } else if (event.target.firstChild.classList.contains('oImg')) {
                   event.target.firstChild.remove();
                  };
               } 
            };
    };

    handleGameState(player, state) {

        if (state === 'win') {
            this.modal.classList.remove('hide');
            this.modalWinnerPara.innerText = `Player ${player} Wins`; 
            this.modalWinnerTitle.innerText = `${player} Takes This Round!`;
        } else if (state === 'draw') {
            this.modal.classList.remove('hide');
            this.modalWinnerPara.innerText = `Draw`; 
            this.modalWinnerTitle.innerText = `This Round Ends in a Draw!`;
        }

    };

    resetGameBoard() {
        const gameSquares = document.querySelectorAll('.game-square');
        gameSquares.forEach(square => {
            square.classList.remove('selected');
        });
    }

    quitGame() {

        this.modal.classList.add('hide');
        this.gameBoard.childNodes.forEach(child => {
            if (child.firstChild) {
                child.firstChild.remove('img');
            }
        });

        this.xScoreCount.innerText = '0';
        this.oScoreCount.innerText = '0';
        this.drawScoreCount.innerHTML = '0';   
        
        this.startdashboard.classList.remove('hide');
        this.mainContainer.classList.add('hide');

    };

    nextRound() {
        this.modal.classList.add('hide');
        
        this.turnIcon.src = './assets/icon-x.svg';

        this.gameBoard.childNodes.forEach(child => {
            if (child.firstChild) {
                child.firstChild.remove('img');
            }
        });

        
    };


}

export default UI;

