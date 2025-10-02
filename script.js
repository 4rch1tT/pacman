const fragment = document.createDocumentFragment(); //* similar to the virtual dom in react 

//* this is the map ;)
let gridArray = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 2, 2, 2, 2, 2, 2, 3, 1],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [1, 2, 1, 5, 2, 2, 1, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 4, 2, 2, 2, 1],
  [1, 3, 2, 2, 2, 2, 2, 2, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let boardDiv = document.getElementById("board");
let cellValue = null;
let cellElement = []; //* for references. eg: cellElement[1][1] will be the pellet div no need to loop thorugh to find the elements

for (let row = 0; row < gridArray.length; row++) {
  let rowCells = [];
  for (let col = 0; col < gridArray[row].length; col++) {
    cellValue = gridArray[row][col];

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
      case 4:
        const pacman = document.createElement("div");
        pacman.classList.add("pacman");
        cell.appendChild(pacman);
        break;
      case 5:
        const ghost = document.createElement("div");
        ghost.classList.add("ghost");
        cell.appendChild(ghost);
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
