
var playerBlack = "Black";
var playerWhite = "White";
// var firstPlayer = playerBlack;
var currPlayer = playerBlack;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keep track of which row each column is at for stacking

window.onload = function() {
    setGame();
}

function setGame(){
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    whosTurn();

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //js
            row.push(' ');

            //html
            // <div id="0-0" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver){
        return;
    }
    
    //get coords of clicked tile
    let coords = this.id.split("-"); // split id from "0-0" to ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
   
    // make sure tile falls to the correct row for the column
    r = currColumns[c]; 
console.log(r);
    // make sure spot is empty
    if (r < 0) { // board[r][c] != ' '
        console.log("return");
        return;
    }
    
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString()); //have to redefine r before we can call the tile
    if (currPlayer == playerBlack) {
        tile.classList.add("black-piece");
        currPlayer = playerWhite;
    } else {
        tile.classList.add("white-piece");
        currPlayer = playerBlack;
    }

    r -= 1; // update row height for columns
    currColumns[c] = r; // update array   
    
    checkWinner();
}

function whosTurn(){
    let winner = document.getElementById("winner");
    winner.innerText = "It's " + currPlayer + "'s Turn"; 
}

function checkWinner(){
    console.log("check winner");
    // horixontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' '){
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r,c);
                    return;
                } else {
                    whosTurn();
                }
            }
        }
    }
    // vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' '){
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r,c);
                    return;
                } else {
                    whosTurn();
                }
            }
        }
    }
    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    winner.innerText = board[r][c] + " Wins!";
    gameOver = true;
}