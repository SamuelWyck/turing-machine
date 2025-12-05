require("./styles/index.css");
const TuringMachineInterFace = require("./turingMachineInterface.js");
// const TuringMachine = require("./turingMachine/turingMachine.js");
// const BoardDisplay = require("./boardDisplay.js");


// const antsInfo = [
//     TuringMachine.fourStateAnt1, 
//     TuringMachine.fourStateAnt2, 
//     TuringMachine.twoStateAnt1,
//     TuringMachine.twoStateAnt2
// ];

        
        
// const machine = new TuringMachine(antsInfo, 100, 100);
// const display = new BoardDisplay(100, 100);
// display.setAntPositions(machine.ants);

// function test() {
//     const updatedAnts = machine.update();
//     display.updateAnts(updatedAnts);
//     setTimeout(test, 0);
// };
// test();

const interface = new TuringMachineInterFace();
interface.start();
