require("./styles/display.css");
const createElement = require("./utils/createElement.js");



class BoardDisplay {
    constructor(cellsWide, cellsHigh) {
        this.leftSymbol = "W";
        this.rightSymbol = "B";
        this.straightSymbol = "G";
        this.turnAroundSymbol = "R";

        this.board = createElement("div", null, "board", "paletteOne");
        const boardContainer = document.querySelector("div.board-wrapper");
        boardContainer.appendChild(this.board);

        this.#fillBoard(cellsWide, cellsHigh);
    };

    #fillBoard(cellsWide, cellsHigh) {
        this.cells = [];
        for (let row = 0; row < cellsHigh; row += 1) {
            const cellRow = [];
            for (let col = 0 ; col < cellsWide; col += 1) {
                const cell = this.#createCell(row, col);
                this.board.appendChild(cell);
                cellRow.push(cell);
            }
            this.cells.push(cellRow);
        }
    };

    #createCell(row, col) {
        const cell = createElement("div", null, "cell", this.leftSymbol);
        const antEle = createElement("div", null, "ant", "hidden");
        cell.appendChild(antEle);
        cell.dataset.row = row;
        cell.dataset.col = col;
        return cell;
    };

    setAntPositions(ants) {
        this.antsMap = {};
        for (let ant of ants) {
            const cell = this.cells[ant.row][ant.col];
            const antElement = cell.firstChild;
            antElement.classList.remove("hidden");
            this.antsMap[ant.id] = cell;
        }
    };

    updateAnts(updateInfo) {
        for (let info of updateInfo) {
            const [ant, cellColor] = info;

            const oldCell = this.antsMap[ant.id];
            oldCell.classList.remove(this.leftSymbol, this.rightSymbol, this.straightSymbol, this.turnAroundSymbol);
            oldCell.classList.add(cellColor);
            const oldAntEle = oldCell.firstChild;
            oldAntEle.classList.add("hidden");
            
            const newCell = this.cells[ant.row][ant.col];
            const newAntEle = newCell.firstChild;
            newAntEle.classList.remove("hidden");
            this.antsMap[ant.id] = newCell;
        }
    };
};



module.exports = BoardDisplay;