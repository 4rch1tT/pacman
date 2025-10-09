// this is the map ;)
let gridArray = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 2, 2, 2, 2, 2, 2, 3, 1],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [1, 2, 1, 0, 2, 2, 1, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 0, 2, 2, 2, 1],
  [1, 3, 2, 2, 2, 2, 2, 2, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let boardDiv = document.getElementById("board");
let cellElement = []; // for references. eg: cellElement[1][1] will be the pellet div no need to loop through to find the elements

let pacmanPos = { row: 7, col: 5 };
let ghost = {
  position: { row: 3, col: 3 },
  mode: "normal",
};

let pacmanAlive = true;
let gameState = "running";

let currentPacDirection = "right";
let nextPacDirection = null;

let target = {};
let interval = null;

const restartBtn = document.getElementById("restart");

let score = 0;
const scoreDiv = document.getElementById("score");

let lives = 3;
const livesDiv = document.getElementById("lives");

const gameOverDiv = document.getElementById("game-over");
const youWinDiv = document.getElementById("you-win");

// simple reload (update it more game like --> next step)
restartBtn.addEventListener("click", () => {
  location.reload();
});

// render the board
function renderBoard(grid) {
  // clear all board if it exists
  boardDiv.innerHTML = "";
  cellElement = [];

  const fragment = document.createDocumentFragment(); // similar to the virtual dom in react

  for (let row = 0; row < gridArray.length; row++) {
    let rowCells = [];
    for (let col = 0; col < gridArray[row].length; col++) {
      const cellValue = gridArray[row][col];

      const cell = document.createElement("div");
      cell.classList.add("cell");

      switch (cellValue) {
        case 0:
          cell.classList.add("empty");
          break;
        case 1:
          cell.classList.add("wall");
          if (row > 0 && grid[row - 1][col] !== 1)
            cell.style.borderTop = "3px solid blue";

          if (row < grid.length - 1 && grid[row + 1][col] !== 1)
            cell.style.borderBottom = "3px solid blue";

          if (col > 0 && grid[row][col - 1] !== 1)
            cell.style.borderLeft = "3px solid blue";

          if (col < grid[row].length - 1 && grid[row][col + 1] !== 1)
            cell.style.borderRight = "3px solid blue";
          break;
        case 2:
          const dot = document.createElement("div");
          dot.classList.add("dot");
          cell.appendChild(dot);
          break;
        case 3:
          const pellet = document.createElement("div");
          pellet.classList.add("pellet");
          cell.appendChild(pellet);
          break;
        default:
          cell.classList.add("empty");
          break;
      }
      rowCells.push(cell);
      fragment.appendChild(cell);
    }
    cellElement.push(rowCells);
  }
  boardDiv.appendChild(fragment);
}

renderBoard(gridArray);

// functions to render the entities i.e pacman and ghost (dynamic)
function renderPacman() {
  const pacCell = cellElement[pacmanPos.row][pacmanPos.col];
  const pacDiv = document.createElement("div");
  pacDiv.classList.add("pacman");
  pacCell.appendChild(pacDiv);
}

function renderGhost() {
  const ghostCell = cellElement[ghost.position.row][ghost.position.col];
  const ghostDiv = document.createElement("div");
  ghostDiv.classList.add("ghost");

  if (ghost.mode === "frightened") {
    ghostDiv.style.backgroundColor = "#FF1493";
  } else {
    ghostDiv.style.backgroundColor = "aqua";
  }

  ghostCell.appendChild(ghostDiv);
}

if (pacmanAlive) {
  renderPacman();
}
renderGhost();

// setting keyboard events
document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow") && interval === null) {
    interval = setInterval(gameLoop, 150);
  }
  if (event.key === "ArrowUp") nextPacDirection = "up";
  if (event.key === "ArrowDown") nextPacDirection = "down";
  if (event.key === "ArrowLeft") nextPacDirection = "left";
  if (event.key === "ArrowRight") nextPacDirection = "right";
});

function gameLoop() {
  if (gameState !== "running") {
    return;
  }
  if (nextPacDirection !== null && canMove(pacmanPos, nextPacDirection)) {
    currentPacDirection = nextPacDirection;
  }

  if (canMove(pacmanPos, currentPacDirection)) {
    cellElement[pacmanPos.row][pacmanPos.col]
      .querySelector(".pacman")
      ?.remove();

    pacmanPos = getNewPosition(pacmanPos, currentPacDirection);

    if (cellElement[pacmanPos.row][pacmanPos.col].querySelector(".dot")) {
      cellElement[pacmanPos.row][pacmanPos.col].querySelector(".dot")?.remove();
      gridArray[pacmanPos.row][pacmanPos.col] = 0;
      score += 10;
      checkWin();
    }

    if (cellElement[pacmanPos.row][pacmanPos.col].querySelector(".pellet")) {
      cellElement[pacmanPos.row][pacmanPos.col]
        .querySelector(".pellet")
        ?.remove();
      gridArray[pacmanPos.row][pacmanPos.col] = 0;
      ghost.mode = "frightened";

      setTimeout(() => {
        if (gameState === "running" || gameState === "paused") {
          ghost.mode = "normal";
        }
      }, 3000);

      score += 50;
      checkWin();
    }

    if (pacmanAlive) {
      renderPacman();
    }
  }

  cellElement[ghost.position.row][ghost.position.col]
    .querySelector(".ghost")
    ?.remove();
  const validGhostDirections = getValidGhostDir(ghost.position);
  const randomGhostDir = getRandomGhostDir(validGhostDirections);

  ghost.position = getNewPosition(ghost.position, randomGhostDir);
  renderGhost();

  if (
    ghost.position.row === pacmanPos.row &&
    ghost.position.col === pacmanPos.col
  ) {
    //checks if the pacman is "powered" up
    if (
      ghost.mode === "frightened" &&
      ghost.position.row === pacmanPos.row &&
      ghost.position.col === pacmanPos.col
    ) {
      gameState = "paused";
      cellElement[ghost.position.row][ghost.position.col]
        .querySelector(".ghost")
        ?.remove();
      setTimeout(() => {
        ghost.position = { row: 3, col: 3 };
        gameState = "running";
      }, 1000);
    } else {
      lives -= 1;
      pacmanAlive = false;
      gameState = "paused";
      cellElement[pacmanPos.row][pacmanPos.col]
        .querySelector(".pacman")
        ?.remove();
      cellElement[ghost.position.row][ghost.position.col]
        .querySelector(".ghost")
        ?.remove();
      setTimeout(() => {
        pacmanPos = { row: 7, col: 5 };
        ghost.position = { row: 3, col: 3 };
        pacmanAlive = true;
        gameState = "running";
      }, 1000);
    }
  }

  if (lives === 0) {
    pacmanAlive = false;
    gameState = "gameOver";
    clearInterval(interval);
    interval = null;
    return (
      (gameOverDiv.style.backdropFilter = "blur(10px)"),
      (gameOverDiv.textContent = "Game Over :(")
    );
  }

  livesDiv.textContent = "Lives:" + lives;
  scoreDiv.textContent = score;
}

// function to check if the pacman can move
function canMove(pos, dir) {
  target = getNewPosition(pos, dir);
  if (gridArray[target.row][target.col] !== 1) return true;
  else return false;
}

// function to set the position of pacman
function getNewPosition(pos, dir) {
  if (dir == "up") return { row: pos.row - 1, col: pos.col };
  if (dir == "down") return { row: pos.row + 1, col: pos.col };
  if (dir == "left") return { row: pos.row, col: pos.col - 1 };
  if (dir == "right") return { row: pos.row, col: pos.col + 1 };
}

// function to find out the valid directions ghost can move
function getValidGhostDir(ghostPos) {
  let ghostDirections = [];
  if (gridArray[ghostPos.row - 1][ghostPos.col] !== 1) {
    ghostDirections.push("up");
  }
  if (gridArray[ghostPos.row + 1][ghostPos.col] !== 1) {
    ghostDirections.push("down");
  }
  if (gridArray[ghostPos.row][ghostPos.col - 1] !== 1) {
    ghostDirections.push("left");
  }
  if (gridArray[ghostPos.row][ghostPos.col + 1] !== 1) {
    ghostDirections.push("right");
  }
  return ghostDirections;
}

// function to take one random direcrion from the validDirections array
function getRandomGhostDir(validGhostDirections) {
  const randomIndex = Math.floor(Math.random() * validGhostDirections.length);

  return validGhostDirections[randomIndex];
}

//function to check if there's any dot or pellet left
function checkWin() {
  //here we are flattening the whole grid array and checking if any dot or pellet left
  if (!gridArray.flat().some((cell) => cell === 2 || cell === 3)) {
    gameState = "youWin";
    clearInterval(interval);
    return (
      (youWinDiv.style.backdropFilter = "blur(10px)"),
      (youWinDiv.textContent = "You Win ;)")
    );
  }
}
