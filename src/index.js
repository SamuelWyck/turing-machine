const TuringMachine = require("./turingMachine/turingMachine.js");



const antsInfo = [
    [{"W": "left", "B": "right", "R": "left", "G": "right"}, {"G": "W", "B": "W", "R": "B", "W": "B"}]
];

const machine = new TuringMachine(antsInfo, 10, 10);

for (let i = 0; i < 2; i += 1) {
    machine.update()
    for (let ant of machine.ants) {
        console.log(ant.row, ant.col);
    }
    console.log(machine.board);
}