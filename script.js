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

// render the entities i.e pacman and ghost it is dynamic
function renderEntities() {
  const pacCell = cellElement[pacmanPos.row][pacmanPos.col];
  const pacDiv = document.createElement("div");
  pacDiv.classList.add("pacman");
  pacCell.appendChild(pacDiv);

  const ghostCell = cellElement[ghostPos.row][ghostPos.col];
  const ghostDiv = document.createElement("div");
  ghostDiv.classList.add("ghost");
  ghostCell.appendChild(ghostDiv);
}

renderEntities();


