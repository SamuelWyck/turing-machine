const randInt = require("../utils/randInt.js");



class Ant {
    constructor(row, col, id, states, colorSwapMap, displayColorSwapMap, boardWidth, boardHeight) {
        this.startRow = row;
        this.startCol = col;
        this.row = row;
        this.col = col;

        this.id = id

        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;

        this.states = states;
        this.colorSwapMap = colorSwapMap;
        this.displayColorSwapMap = displayColorSwapMap;

        this.positionDeltaMap = {"west": [0, -1], "north": [-1, 0], "east": [0, 1], "south": [1, 0]};
        this.cardinalDirections = ["west", "north", "east", "south"];
        this.directionIndex = randInt(0, this.cardinalDirections.length);
    };

    #rotate(turn) {
        if (turn === "left") {
            this.directionIndex = (this.directionIndex === 0) ? this.cardinalDirections.length - 1 : this.directionIndex - 1;
        } else if (turn === "right") {
            this.directionIndex = (this.directionIndex === this.cardinalDirections.length - 1) ? 0 : this.directionIndex + 1;
        } else if (turn === "turn around") {
            this.directionIndex += 2;
            if (this.directionIndex >= this.cardinalDirections.length) {
                this.directionIndex -= this.cardinalDirections.length;
            }
        }
    };

    move(color) {
        const turnDirection = this.states[color];
        this.#rotate(turnDirection);
        const cardinalDirection = this.cardinalDirections[this.directionIndex];

        const [rowChange, colChange] = this.positionDeltaMap[cardinalDirection];
        this.row += rowChange;
        if (this.row < 0) {
            this.row = this.boardHeight - 1;
        } else if (this.row >= this.boardHeight) {
            this.row = 0;
        }

        this.col += colChange;
        if (this.col < 0) {
            this.col = this.boardWidth - 1;
        } else if (this. col >= this.boardWidth) {
            this.col = 0;
        }

        const newColor = this.colorSwapMap[color];
        const displayColor = this.displayColorSwapMap[color];
        return [newColor, displayColor];
    };

    reset() {
        this.row = this.startRow;
        this.col = this.startCol;
        this.directionIndex = 1;
    };
};



module.exports = Ant;