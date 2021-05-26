import { Board } from "../models/board";
import { Command } from "../models/command";
import { Direction } from "../models/direction";
import { Position } from "../models/position";
import { Robot } from "../models/robot";
import { errorMessages } from "../shared/error-message";

export class GameService {
    private board: Board;
    private robot: Robot;
    constructor(board: Board, robot: Robot) {
        this.board = board;
        this.robot = robot;
    }

    /**
     * Handle user input command
     * @param input 
     */
    handleCommand(input: string): void {
        if (!this.validateCommand(input)) {
            throw errorMessages.INVALID_COMMAND_MESSAGE;
        }
        const command = this.readCommand(input);
        const mainCommand = command[0];
        if (mainCommand !== Command.PLACE && !this.robot.position) {
            throw errorMessages.NOT_PLACED_ERROR_MESSAGE;
        }
        switch (mainCommand) {
            case Command.PLACE:
                this.handlePlaceCommand(command);
                break;
            case Command.MOVE:
                this.handleMoveCommand();
                break;
            case Command.LEFT:
                this.robot.turnLeft();
                break;
            case Command.RIGHT:
                this.robot.turnRight();
                break;
            case Command.REPORT:
                this.handleReportCommand();
                break;
        }
    }

    /**
     * Handle Place command
     * @param command 
     */
    private handlePlaceCommand(command: string[]) {
        const commandDetails = command[1].split(',');
        const x = parseInt(commandDetails[0]);
        const y = parseInt(commandDetails[1]);
        const placePosition = new Position(x, y);
        if (!this.board.isValidPosition(placePosition)) {
            throw errorMessages.PLACE_INVALID_POSITION_MESSAGE;
        }
        const dir: Direction = commandDetails[2] as Direction;
        this.robot.place(placePosition, dir);
    }

    /**
     * Handle move command
     */
    private handleMoveCommand() {
        const position = this.robot.getNextPosition();
        if (this.board.isValidPosition(position)) {
            this.robot.move(position);
        } else {
            console.warn('It is an invalid movement, the robot will ignore the movement')
        }
    }

    /**
     * Handle report command
     */
    private handleReportCommand() {
        console.log(`Output:'${this.robot.position.x}','${this.robot.position.y}','${this.robot.direction}'`)
    }

    /**
     * Validate command
     * @param command 
     * @returns 
     */
    private validateCommand(command: string): boolean {
        if (!command) {
            return false;
        }
        return this.validateOtherCommand(command) || this.validatePlaceCommand(command);
    }

    /**
     * Validate place command 
     * @param input 
     * @returns 
     */
    private validatePlaceCommand(input: string) {
        const placeCommandRegex = /^PLACE (?<x>-?\d),(?<y>-?\d),(?<direction>(EAST|WEST|NORTH|SOUTH))$/;
        return placeCommandRegex.test(input);
    }

    /**
     * validate other command, like MOVE, LEFT, RIGHT, REPORT
     * @param input 
     * @returns 
     */
    private validateOtherCommand(input: string): boolean {
        if (input in Command) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Read and split command as array string
     * @param command 
     * @returns 
     */
    private readCommand(command: string): string[] {
        return command.split(' ');
    }
}