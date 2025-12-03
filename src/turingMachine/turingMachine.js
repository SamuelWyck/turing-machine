const Ant = require("./ant.js");
const randInt = require("../utils/randInt.js");



class TuringMachine {
    constructor(antsInfo, width, height) {
        this.width = width;
        this.height = height;
        this.whiteSymbol = "W";
        this.board = this.#generateBoard();
        this.createAnts(antsInfo);
    };

    #generateBoard() {
        const board = [];
        for (let i = 0; i < this.height; i += 1) {
            const row = [];
            for (let j = 0; j < this.width; j += 1) {
                row.push(this.whiteSymbol);
            }
            board.push(row);
        }
        return board;
    };

    createAnts(antsInfo) {
        this.antsInfo = antsInfo;
        this.ants = [];
        for (let i = 0; i < antsInfo.length; i += 1) {
            const [antStates, colorSwapMap] = antsInfo[i];
            const [row, col] = this.#getRandomCoords();
            const ant = new Ant(row, col, i, antStates, colorSwapMap, this.width, this.height);
            this.ants.push(ant);
        }
    };

    #getRandomCoords() {
        const row = randInt(0, this.height);
        const col = randInt(0, this.width);
        return [row, col];
    };

    update() {
        const updatedAnts = [];
        for (let ant of this.ants) {
            const oldRow = ant.row;
            const oldCol = ant.col;
            const color = this.board[ant.row][ant.col];
            const newColor = ant.move(color);
            this.board[oldRow][oldCol] = newColor;
            updatedAnts.push([ant, newColor]);
        };
        return updatedAnts;
    };
};



module.exports = TuringMachine;