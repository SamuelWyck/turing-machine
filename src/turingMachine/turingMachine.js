const Ant = require("./ant.js");
const randInt = require("../utils/randInt.js");



class TuringMachine {
    static twoStateAnt1 = [
        {"W": "left", "B": "right", "R": "left", "G": "right"}, 
        {"G": "R", "B": "W", "R": "G", "W": "B"},
        {"G": "W", "B": "W", "R": "B", "W": "B"}
    ];
    static twoStateAnt2 = [
        {"W": "left", "B": "right", "R": "left", "G": "right"}, 
        {"G": "R", "B": "W", "R": "G", "W": "B"},
        {"G": "R", "B": "R", "R": "G", "W": "G"}
    ];
    static fourStateAnt1 = [
        {"W": "left", "B": "right", "R": "straight", "G": "turn around"}, 
        {"G": "R", "B": "W", "R": "G", "W": "B"},
        {"G": "R", "B": "W", "R": "G", "W": "B"}
    ];
    static fourStateAnt2 = [
        {"W": "left", "B": "right", "R": "straight", "G": "turn around"}, 
        {"G": "B", "B": "R", "R": "W", "W": "G"},
        {"G": "B", "B": "R", "R": "W", "W": "G"}
    ];

    constructor(antsInfo, width, height) {
        this.width = width;
        this.height = height;
        this.leftSymbol = "W";
        this.turnAroundSymbol = "R";
        this.board = this.#generateBoard();
        this.createAnts(antsInfo);
    };

    #generateBoard() {
        const board = [];
        let count = -1;
        for (let i = 0; i < this.height; i += 1) {
            count += 1;
            const row = [];
            for (let j = 0; j < this.width; j += 1) {
                let symbol = this.leftSymbol;
                if (count % 2 == 0) {
                    symbol = this.turnAroundSymbol;
                }
                row.push(symbol);
                count += 1;
            }
            board.push(row);
        }
        return board;
    };

    createAnts(antsInfo) {
        this.antsInfo = antsInfo;
        this.ants = [];
        for (let i = 0; i < antsInfo.length; i += 1) {
            const [antStates, colorSwapMap, displayColorSwapMap] = antsInfo[i];
            const [row, col] = this.#getRandomCoords();
            const ant = new Ant(row, col, i, antStates, colorSwapMap, displayColorSwapMap, this.width, this.height);
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
            const [newColor, displayColor] = ant.move(color);
            this.board[oldRow][oldCol] = newColor;
            updatedAnts.push([ant, displayColor]);
        };
        return updatedAnts;
    };
};



module.exports = TuringMachine;