const TuringMachine = require("./turingMachine/turingMachine.js");
const BoardDisplay = require("./boardDisplay.js");
const createElement = require("./utils/createElement.js");
const closeImg = require("./assets/images/close.svg");


class TuringMachineInterFace {
    constructor() {
        const antsInfo = [
            [0, TuringMachine.fourStateAnt1], 
            [1, TuringMachine.fourStateAnt2], 
            [2, TuringMachine.twoStateAnt1],
            [3, TuringMachine.twoStateAnt2]
        ];
        this.antCardTitleMap = {};
        this.antCardTitleMap[TuringMachine.twoStateAnt1] = "Two Color Ant A";
        this.antCardTitleMap[TuringMachine.twoStateAnt2] = "Two Color Ant B";
        this.antCardTitleMap[TuringMachine.fourStateAnt1] = "Four Color Ant A";
        this.antCardTitleMap[TuringMachine.fourStateAnt2] = "Four Color Ant B";
        this.selectValueMap = {
            "2A": TuringMachine.twoStateAnt1,
            "2B": TuringMachine.twoStateAnt2,
            "4A": TuringMachine.fourStateAnt1,
            "4B": TuringMachine.fourStateAnt2
        };

        const boardSize = 100;
        this.turingMachine = new TuringMachine(antsInfo, boardSize, boardSize);
        this.display = new BoardDisplay(boardSize, boardSize, this.turingMachine.ants);

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
            "paletteNine",
            "paletteTen",
            "paletteEleven",
            "paletteTwelve",
            "palette13",
            "palette14",
            "palette15",
            "palette16"
        ];

        this.modalShowing = false;
        this.currentAntDiv = document.querySelector(".current-ants");
        this.initializeCurrentAnts(antsInfo);
        this.antTypeSelect = document.querySelector("#ant-choice");

        this.machineLoop = this.machineLoop.bind(this);
        this.optionsBtnCallback = this.optionsBtnCallback.bind(this);
        this.modalCallBack = this.modalCallBack.bind(this);
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
        if (this.modalShowing) {
            return;
        }

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
            this.optionsModal.classList.toggle("hidden");
            this.modalShowing = true;
        }
    };

    modalCallBack(event) {
        const target = (event.target.matches("button")) ? event.target : event.target.parentElement;
        
        if (target.matches(".exit-btn")) {
            this.currentAntDiv.innerHTML = "";
            for (let card of this.antCardCopy) {
                this.currentAntDiv.appendChild(card);
            }
            this.modalShowing = false;
            this.optionsModal.classList.toggle("hidden");
        } else if (target.matches(".add-ant")) {
            const selectValue = this.antTypeSelect.value;
            const antType = this.selectValueMap[selectValue];
            const newCard = this.#createAntCard(antType);
            this.currentAntDiv.appendChild(newCard);
        } else if (target.matches(".apply-btn")) {
            let wasRunning = false;
            if (this.run) {
                wasRunning = true;
                this.stop();
            }
            const antsInfo = this.getNewAnts();
            this.turingMachine.setAnts(antsInfo);
            this.display.setAnts(this.turingMachine.ants);
            this.modalShowing = false;
            this.optionsModal.classList.toggle("hidden");
            if (wasRunning) {
                this.start();
            }
        } else if (target.matches(".remove-ant-btn")) {
            const card = target.parentElement;
            card.remove(); 
        }
    };

    getNewAnts() {
        this.antCardCopy = [];
        const antsInfo = [];
        for (let i = 0; i < this.currentAntDiv.children.length; i += 1) {
            const antCard = this.currentAntDiv.children[i];
            this.antCardCopy.push(antCard);
            const antType = Number(antCard.dataset.type);
            antsInfo.push([i, antType]);
        }
        return antsInfo;
    };

    initializeButtons() {
        const optionsDiv = document.querySelector("div.options");
        optionsDiv.addEventListener("click", this.optionsBtnCallback);

        this.optionsModal = document.querySelector(".options-modal");
        this.optionsModal.addEventListener("click", this.modalCallBack);
    };

    initializeCurrentAnts(antsInfo) {
        for (let antInfo of antsInfo) {
            const [_, antType] = antInfo;
            const antCard = this.#createAntCard(antType);
            this.currentAntDiv.append(antCard);
        }
        this.antCardCopy = [...this.currentAntDiv.children];
    };

    #createAntCard(antType) {
        const card = createElement("div", null, "ant-card");
        card.dataset.type = antType;

        const titlePara = createElement("p", null, "ant-card-title");
        titlePara.textContent = this.antCardTitleMap[antType];
        card.appendChild(titlePara);

        const removeBtn = createElement("button", null, "remove-ant-btn");
        const image = createElement("img");
        image.src = closeImg;
        removeBtn.appendChild(image);
        card.appendChild(removeBtn);

        return card;
    };
};



module.exports = TuringMachineInterFace;