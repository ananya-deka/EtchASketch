let currentSize = 0;
let sketchMode = false;
let color = document.getElementById("current-color").value;

const grid = document.querySelector(".grid");
const setGridBtn = document.querySelector(".set-grid-btn");
const inputColorBtn = document.querySelector(".color_picker");
const clearGridBtn = document.querySelector(".clear-grid-btn");
const setRainbowColorBtn = document.querySelector(".rainbow");
createGrid(16);

setGridBtn.addEventListener("click", setGridSize);
clearGridBtn.addEventListener("click", clearGrid);
grid.addEventListener("click", toggleSketching);
setRainbowColorBtn.addEventListener("click", setColor);
inputColorBtn.addEventListener("change", setColor);
// UTILITY FUNCTIONS

function setColor() {
	color = this.dataset.color || inputColorBtn.value;
}

function getRandom() {
	return `${Math.floor(Math.random() * 256)}`;
}

function addCells(size) {
	for (let i = 0; i < size; i++) {
		const div = document.createElement("div");
		div.classList.add("cell");
		grid.appendChild(div);
	}
}

function removeCells(size) {
	const cells = document.querySelectorAll(".cell");

	for (let i = 0; i < size; i++) {
		cells[i].remove();
	}
}

function sketch() {
	const cells = document.querySelectorAll(".cell");
	if (sketchMode) {
		cells.forEach((cell) =>
			cell.addEventListener("mouseover", changeColor)
		);
	} else {
		cells.forEach((cell) =>
			cell.removeEventListener("mouseover", changeColor)
		);
	}
}

// EVENT HANDLERS

function changeColor() {
	if (color == "rainbow")
		this.style.backgroundColor = `rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`;
	else this.style.backgroundColor = color;
}

function clearGrid() {
	const cells = document.querySelectorAll(".cell");
	cells.forEach((cell) => {
		cell.style.backgroundColor = "whitesmoke";
	});
}

function setGridSize() {
	const size = parseInt(
		prompt("Please enter the size of the grid (2 - 100)")
	);
	createGrid(size);
}

function toggleSketching() {
	sketchMode = !sketchMode;
	sketch();
}

function createGrid(size) {
	if (currentSize == size) return;

	if (currentSize < size) {
		addCells(size ** 2 - currentSize ** 2);
	} else {
		removeCells(currentSize ** 2 - size ** 2);
	}

	currentSize = size;
	grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
}
