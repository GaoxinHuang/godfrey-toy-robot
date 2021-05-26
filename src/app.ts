import { Board } from "./models/board";
import { Robot } from "./models/robot";
import { GameService } from "./services/game-service";
import helper from "./shared/input-helper";

const ASK_COMMAND= "Please enter your command: ";
const board = new Board(5, 5);
const robot = new Robot();
const game = new GameService(board, robot);
console.log("=== Welcome to Godfrey's Toy Robot === \n");
console.log("There are following commands below:");
console.log("PLACE X,Y,F: place the robot. Where X and Y are integer. F must be NORTH or SOUTH or EAST or WEST")
console.log("MOVE: move the robot forward");
console.log("LEFT: turn the robot left");
console.log("RIGHT: turn the robot right");
console.log("REPORT: show the current status of the robot \n");

const play = async (): Promise<void> => {
    const command = await helper.inputHelper(ASK_COMMAND);
    try {
        game.handleCommand(command);
        console.log("Executed the command successfully");
        await play();
    } catch (error) {
        console.error(error);
        await play();
    }
}

play();