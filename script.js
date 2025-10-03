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
let ghostPos = { row: 3, col: 3 };

let currentDirection = "right";
let nextDirection = null;
let target = {};

let interval = null;

let score = 0;
let lives = 3;

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

// render the entities i.e pacman and ghost (dynamic)
function renderPacman() {
  const pacCell = cellElement[pacmanPos.row][pacmanPos.col];
  const pacDiv = document.createElement("div");
  pacDiv.classList.add("pacman");
  pacCell.appendChild(pacDiv);
}

function renderGhost() {
  const ghostCell = cellElement[ghostPos.row][ghostPos.col];
  const ghostDiv = document.createElement("div");
  ghostDiv.classList.add("ghost");
  ghostCell.appendChild(ghostDiv);
}

renderPacman();
renderGhost();

// setting keyboard events
document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow") && interval === null) {
    interval = setInterval(gameLoop, 150);
  }
  if (event.key === "ArrowUp") nextDirection = "up";
  if (event.key === "ArrowDown") nextDirection = "down";
  if (event.key === "ArrowLeft") nextDirection = "left";
  if (event.key === "ArrowRight") nextDirection = "right";
});

function gameLoop() {
  if (nextDirection !== null && canMove(pacmanPos, nextDirection)) {
    currentDirection = nextDirection;
  }

  if (canMove(pacmanPos, currentDirection)) {
    cellElement[pacmanPos.row][pacmanPos.col]
      .querySelector(".pacman")
      ?.remove();

    pacmanPos = getNewPosition(pacmanPos, currentDirection);

    if (cellElement[pacmanPos.row][pacmanPos.col].querySelector(".dot")) {
      cellElement[pacmanPos.row][pacmanPos.col].querySelector(".dot")?.remove();
      gridArray[pacmanPos.row][pacmanPos.col] = 0;
      score += 10;
    }

    if (cellElement[pacmanPos.row][pacmanPos.col].querySelector(".pellet")) {
      cellElement[pacmanPos.row][pacmanPos.col]
        .querySelector(".pellet")
        ?.remove();
      gridArray[pacmanPos.row][pacmanPos.col] = 0;
      score += 50;
    }
    
    renderPacman();
  }
}

// function to check if the pacman can move
function canMove(pos, dir) {
  target = getNewPosition(pos, dir);
  if (gridArray[target.row][target.col] !== 1) return true;
  else return false;
}

// function to set the position
function getNewPosition(pos, dir) {
  if (dir == "up") return { row: pos.row - 1, col: pos.col };
  if (dir == "down") return { row: pos.row + 1, col: pos.col };
  if (dir == "left") return { row: pos.row, col: pos.col - 1 };
  if (dir == "right") return { row: pos.row, col: pos.col + 1 };
}
