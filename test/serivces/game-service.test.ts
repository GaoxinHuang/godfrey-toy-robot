import { GameService } from "../../src/services/game-service";
import { Robot } from "../../src/models/robot";
import { Board } from "../../src/models/board";
import { setupBoard } from "../helper";
import { errorMessages } from "../../src/shared/error-message";
import { Direction } from "../../src/models/direction";

const testRobotReportMessage = (robot: Robot, mockLog: jest.Mock, x: number, y: number, dir: Direction) => {
    expect(mockLog.mock.calls[0][0]).toEqual(`Output:'${x}','${y}','${dir}'`)
}

let game: GameService
let robot: Robot;
let board: Board
describe("Test game service, return ask command", () => {
    beforeEach(() => {
        robot = new Robot();
        board = setupBoard();
        game = new GameService(board, robot);
    });
    describe("Test all illegal commands", () => {
        test("Test empty command", () => {
            expect(() => { game.handleCommand('') }).toThrowError(errorMessages.INVALID_COMMAND_MESSAGE);
        });
        test("Test invalid command", () => {
            expect(() => { game.handleCommand('invalid') }).toThrowError(errorMessages.INVALID_COMMAND_MESSAGE);
        });
        test("Test invalid X in PLACE command", () => {
            expect(() => { game.handleCommand('PLACE X,2,NORTH') }).toThrowError(errorMessages.INVALID_COMMAND_MESSAGE);
        });
        test("Test invalid Y in PLACE command", () => {
            expect(() => { game.handleCommand('PLACE 2,Y,NORTH') }).toThrowError(errorMessages.INVALID_COMMAND_MESSAGE);
        });
        test("Test invalid direction in PLACE command", () => {
            expect(() => { game.handleCommand('PLACE 2,3,N') }).toThrowError(errorMessages.INVALID_COMMAND_MESSAGE);
        });
        test("Test input MOVE command before Place command", () => {
            expect(() => { game.handleCommand('MOVE') }).toThrowError(errorMessages.NOT_PLACED_ERROR_MESSAGE);
        });
        test("Test input LEFT command before Place command", () => {
            expect(() => { game.handleCommand('LEFT') }).toThrowError(errorMessages.NOT_PLACED_ERROR_MESSAGE);
        });
        test("Test input RIGHT command before Place command", () => {
            expect(() => { game.handleCommand('RIGHT') }).toThrowError(errorMessages.NOT_PLACED_ERROR_MESSAGE);
        });
        test("Test input REPORT command before Place command", () => {
            expect(() => { game.handleCommand('REPORT') }).toThrowError(errorMessages.NOT_PLACED_ERROR_MESSAGE);
        });
    });
    describe("Test PLACE command", () => {
        test("Test place robot out of board", () => {
            expect(() => { game.handleCommand('PLACE 5,5,NORTH') }).toThrowError(errorMessages.PLACE_INVALID_POSITION_MESSAGE);
        });
        test("Test place robot board successfully", () => {
            game.handleCommand('PLACE 4,3,NORTH')
            expect(robot.position.x).toEqual(4);
            expect(robot.position.y).toEqual(3);
            expect(robot.direction).toEqual(Direction.NORTH);
        });
    });

    describe("Test MOVE command", () => {
        let mockConsoleWarn = jest.fn();
        let origialConsoleWarn: any;
        beforeEach(() => {
            origialConsoleWarn = console.warn;
            console.warn = mockConsoleWarn;
            mockConsoleWarn.mockClear();
        });
        afterEach(() => {
            console.warn = origialConsoleWarn;
        });
        test("Test the robot move out of board as X is 0", () => {
            game.handleCommand('PLACE 0,3,WEST');
            expect(robot.position.x).toEqual(0);
            expect(robot.position.y).toEqual(3);
            expect(robot.direction).toEqual(Direction.WEST);
            game.handleCommand('MOVE');
            expect(robot.position.x).toEqual(0);
            expect(robot.position.y).toEqual(3);
            expect(robot.direction).toEqual(Direction.WEST);
            expect(mockConsoleWarn).toHaveBeenCalled();
        });
        test("Test the robot move out of board as Y is 0", () => {
            game.handleCommand('PLACE 3,0,SOUTH');
            expect(robot.position.x).toEqual(3);
            expect(robot.position.y).toEqual(0);
            expect(robot.direction).toEqual(Direction.SOUTH);
            game.handleCommand('MOVE');
            expect(robot.position.x).toEqual(3);
            expect(robot.position.y).toEqual(0);
            expect(robot.direction).toEqual(Direction.SOUTH);
            expect(mockConsoleWarn).toHaveBeenCalled();
        });
        test("Test the robot move out of board as X is max", () => {
            game.handleCommand('PLACE 4,3,EAST');
            expect(robot.position.x).toEqual(4);
            expect(robot.position.y).toEqual(3);
            expect(robot.direction).toEqual(Direction.EAST);
            game.handleCommand('MOVE');
            expect(robot.position.x).toEqual(4);
            expect(robot.position.y).toEqual(3);
            expect(robot.direction).toEqual(Direction.EAST);
            expect(mockConsoleWarn).toHaveBeenCalled();
        });
        test("Test the robot move out of board as Y is max", () => {
            game.handleCommand('PLACE 3,4,NORTH');
            expect(robot.position.x).toEqual(3);
            expect(robot.position.y).toEqual(4);
            expect(robot.direction).toEqual(Direction.NORTH);
            game.handleCommand('MOVE');
            expect(robot.position.x).toEqual(3);
            expect(robot.position.y).toEqual(4);
            expect(robot.direction).toEqual(Direction.NORTH);
            expect(mockConsoleWarn).toHaveBeenCalled();
        });
        test("Test the robot move successfully", () => {
            game.handleCommand('PLACE 1,1,SOUTH');
            expect(robot.position.x).toEqual(1);
            expect(robot.position.y).toEqual(1);
            expect(robot.direction).toEqual(Direction.SOUTH);
            game.handleCommand('MOVE');
            expect(robot.position.x).toEqual(1);
            expect(robot.position.y).toEqual(0);
            expect(robot.direction).toEqual(Direction.SOUTH);
            expect(mockConsoleWarn).not.toHaveBeenCalled();
        });
    });
    describe("Test LEFT command", () => {
        test("Test LEFT command from south", () => {
            game.handleCommand('PLACE 0,0,SOUTH');
            expect(robot.direction).toEqual(Direction.SOUTH);
            game.handleCommand('LEFT');
            expect(robot.direction).toEqual(Direction.EAST);
        });
        test("Test LEFT command from east", () => {
            game.handleCommand('PLACE 0,0,EAST');
            expect(robot.direction).toEqual(Direction.EAST);
            game.handleCommand('LEFT');
            expect(robot.direction).toEqual(Direction.NORTH);
        });
        test("Test LEFT command from north", () => {
            game.handleCommand('PLACE 0,0,NORTH');
            expect(robot.direction).toEqual(Direction.NORTH);
            game.handleCommand('LEFT');
            expect(robot.direction).toEqual(Direction.WEST);
        });
        test("Test LEFT command from west", () => {
            game.handleCommand('PLACE 0,0,WEST');
            expect(robot.direction).toEqual(Direction.WEST);
            game.handleCommand('LEFT');
            expect(robot.direction).toEqual(Direction.SOUTH);
        });
    });
    describe("Test RIGHT command", () => {
        test("Test RIGHT command from south", () => {
            game.handleCommand('PLACE 0,0,SOUTH');
            expect(robot.direction).toEqual(Direction.SOUTH);
            game.handleCommand('RIGHT');
            expect(robot.direction).toEqual(Direction.WEST);
        });
        test("Test RIGHT command from east", () => {
            game.handleCommand('PLACE 0,0,EAST');
            expect(robot.direction).toEqual(Direction.EAST);
            game.handleCommand('RIGHT');
            expect(robot.direction).toEqual(Direction.SOUTH);
        });
        test("Test RIGHT command from north", () => {
            game.handleCommand('PLACE 0,0,NORTH');
            expect(robot.direction).toEqual(Direction.NORTH);
            game.handleCommand('RIGHT');
            expect(robot.direction).toEqual(Direction.EAST);
        });
        test("Test RIGHT command from west", () => {
            game.handleCommand('PLACE 0,0,WEST');
            expect(robot.direction).toEqual(Direction.WEST);
            game.handleCommand('RIGHT');
            expect(robot.direction).toEqual(Direction.NORTH);
        });
    });
    describe("Test REPORT command", () => {
        let mockConsoleLog = jest.fn();
        let origialConsoleLog: any;
        beforeEach(() => {
            origialConsoleLog = console.log;
            console.log = mockConsoleLog;
            mockConsoleLog.mockClear();
        });
        afterEach(() => {
            console.log = origialConsoleLog;
        });
        test("Test report command", () => {
            game.handleCommand('PLACE 2,2,NORTH');
            game.handleCommand('REPORT');
            testRobotReportMessage(robot, mockConsoleLog, 2, 2, Direction.NORTH);
        });
        describe("Test examples in requirement", () => {
            test("Test example a in requirement", () => {
                game.handleCommand('PLACE 0,0,NORTH');
                game.handleCommand('MOVE');
                game.handleCommand('REPORT');
                testRobotReportMessage(robot, mockConsoleLog, 0, 1, Direction.NORTH);
            });
            test("Test example b in requirement", () => {
                game.handleCommand('PLACE 0,0,NORTH');
                game.handleCommand('LEFT');
                game.handleCommand('REPORT');
                testRobotReportMessage(robot, mockConsoleLog, 0, 0, Direction.WEST);
            });

            test("Test example C in requirement", () => {
                game.handleCommand('PLACE 1,2,EAST');
                game.handleCommand('MOVE');
                game.handleCommand('MOVE');
                game.handleCommand('LEFT');
                game.handleCommand('MOVE');
                game.handleCommand('REPORT');
                testRobotReportMessage(robot, mockConsoleLog, 3, 3, Direction.NORTH);
            });
        });
    });
});