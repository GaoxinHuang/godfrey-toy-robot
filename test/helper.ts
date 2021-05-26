import { Board } from "../src/models/board";
import { Direction } from "../src/models/direction";
import { Position } from "../src/models/position";
import { Robot } from "../src/models/robot";

export const setupBoard = (x: number = 5, y: number = 5): Board => {
    return new Board(x, y);
}

export const placeRobot = (robot: Robot, direct: Direction = Direction.NORTH, x: number = 0, y: number = 0): void => {
    const newPosition = new Position(x, y);
    robot.place(newPosition, direct);
}
