const TuringMachine = require("./turingMachine/turingMachine.js");
const BoardDisplay = require("./boardDisplay.js");


class TuringMachineInterFace {
    constructor() {
        const antsInfo = [
            TuringMachine.fourStateAnt1, 
            TuringMachine.fourStateAnt2, 
            TuringMachine.twoStateAnt1,
            TuringMachine.twoStateAnt2,
            TuringMachine.fourStateAnt1, 
            TuringMachine.fourStateAnt2, 
            TuringMachine.twoStateAnt1,
            TuringMachine.twoStateAnt2,
            TuringMachine.fourStateAnt1, 
            TuringMachine.fourStateAnt2, 
            TuringMachine.twoStateAnt1,
            TuringMachine.twoStateAnt2
        ];
        const boardSize = 100;
        this.turingMachine = new TuringMachine(antsInfo, boardSize, boardSize);
        this.display = new BoardDisplay(boardSize, boardSize);
        this.display.setAntPositions(this.turingMachine.ants);

        this.run = true;
        this.speeds = [500, 250, 100, 0, 1];
        this.speedBtnClassMap = {500: "one", 250: "two", 100: "five", 0: "max", 1: "stop"};
        this.speedIndex = 0;

        this.paletteIndex = 0;
        this.paletteClasses = [
            "paletteOne", 
            "paletteTwo", 
            "paletteThree", 
            "paletteFour", 
            "paletteFive", 
            "paletteSix",
            "paletteSeven",
            "paletteEight",
            "paletteNine"
        ];

        this.machineLoop = this.machineLoop.bind(this);
        this.optionsBtnCallback = this.optionsBtnCallback.bind(this);
        this.initializeButtons();
    };

    machineLoop() {
        const updatedAnts = this.turingMachine.update();
        this.display.updateAnts(updatedAnts);

        if (this.run) {
            setTimeout(this.machineLoop, this.speeds[this.speedIndex]);
        }
    };

    start() {
        this.run = true;
        this.machineLoop();
    };

    stop() {
        this.run = false;
    };

    optionsBtnCallback(event) {
        const btn = (event.target.matches("button")) ? event.target : event.target.parentElement;
        if (btn.matches(".speed")) {

            btn.classList.remove("one", "two", "five", "max", "stop");
            this.speedIndex = (this.speedIndex + 1 === this.speeds.length) ? 0 : this.speedIndex + 1;
            const speed = this.speeds[this.speedIndex];
            if (speed === 1) {
                this.stop();
            } else if (!this.run) {
                this.start();
            }
            const btnClass = this.speedBtnClassMap[speed];
            btn.classList.add(btnClass);

        } else if (btn.matches(".palette")) {
            this.display.board.classList.remove(...this.paletteClasses);
            this.paletteIndex = (this.paletteIndex + 1 === this.paletteClasses.length) ? 0 : this.paletteIndex + 1;
            const boardClass = this.paletteClasses[this.paletteIndex];
            this.display.board.classList.add(boardClass);
        } else if (btn.matches(".settings")) {

        }
    };

    initializeButtons() {
        const optionsDiv = document.querySelector("div.options");
        optionsDiv.addEventListener("click", this.optionsBtnCallback);
    };
};



module.exports = TuringMachineInterFace;