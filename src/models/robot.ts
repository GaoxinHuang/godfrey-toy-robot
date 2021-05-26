import { Direction } from "./direction";
import { Position } from "./position";

export class Robot {
    direction: Direction;
    position: Position;

    /**
     * Place robot
     * @param position 
     * @param direction 
     */
    place(position: Position, direction: Direction) {
        this.position = new Position(position.x, position.y);
        this.direction = direction;
    }

    /**
     * Move to new position
     * @param newPosition 
     */
    move(newPosition: Position) {
        if (!this.position) {
            throw "position should not null";
        }
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }

    /**
     * Get robot next position
     * @returns 
     */
    getNextPosition(): Position {
        if (!this.position) {
            throw "position should not null";
        }
        const newPosition = new Position(this.position.x, this.position.y);
        switch (this.direction) {
            case Direction.NORTH:
                newPosition.y = newPosition.y + 1;
                break;
            case Direction.WEST:
                newPosition.x = newPosition.x - 1;
                break;
            case Direction.SOUTH:
                newPosition.y = newPosition.y - 1;
                break;
            case Direction.EAST:
                newPosition.x = newPosition.x + 1;
                break;
            default:
                throw "The robot direction is invalid";
        }
        return newPosition;
    }

    /**
     * robot turns left
     */
    turnLeft() {
        switch (this.direction) {
            case Direction.NORTH:
                this.direction = Direction.WEST;
                break;
            case Direction.WEST:
                this.direction = Direction.SOUTH;
                break;
            case Direction.SOUTH:
                this.direction = Direction.EAST;
                break;
            case Direction.EAST:
                this.direction = Direction.NORTH;
                break;
            default:
                throw "The robot direction is invalid";
        }
    }

    /**
     * robot turns right
     */
    turnRight() {
        switch (this.direction) {
            case Direction.NORTH:
                this.direction = Direction.EAST;
                break;
            case Direction.WEST:
                this.direction = Direction.NORTH;
                break;
            case Direction.SOUTH:
                this.direction = Direction.WEST;
                break;
            case Direction.EAST:
                this.direction = Direction.SOUTH;
                break;
            default:
                throw "The robot direction is invalid";
        }
    }
}