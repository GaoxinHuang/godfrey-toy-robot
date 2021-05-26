import { Position } from "./position";

export class Board {
    row: number;
    column: number;
    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    /**
     * Validate position, if true - valid, otherwise invalid 
     * @param newPosition 
     * @returns 
     */
    isValidPosition(newPosition: Position): boolean {
        return newPosition.x < this.column && newPosition.x >= 0
            && newPosition.y < this.row && newPosition.y >= 0;
    }
}