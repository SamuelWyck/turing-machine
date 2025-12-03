require("./styles/index.css");
const TuringMachine = require("./turingMachine/turingMachine.js");
const BoardDisplay = require("./boardDisplay.js");



const antsInfo = [
    [{"W": "left", "B": "right", "R": "straight", "G": "turn around"}, {"G": "R", "B": "W", "R": "G", "W": "B"}],
    [{"W": "left", "B": "right", "R": "straight", "G": "turn around"}, {"G": "B", "B": "R", "R": "W", "W": "G"}]
];


// for (let i = 0; i < 2; i += 1) {
//     machine.update()
//     for (let ant of machine.ants) {
//         console.log(ant.row, ant.col);
//     }
//     console.log(machine.board);
// }
        
        
const machine = new TuringMachine(antsInfo, 100, 100);
const display = new BoardDisplay(100, 100);
display.setAntPositions(machine.ants);

function test() {
    const updatedAnts = machine.update();
    display.updateAnts(updatedAnts);
    setTimeout(test, 100);
}
test()