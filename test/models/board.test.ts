import { Board } from "../../src/models/board";
import { Position } from "../../src/models/position";
import { setupBoard } from "../helper";

describe("Test board for 5*5 units", () => {
    let board: Board;
    beforeEach(() => {
        board = setupBoard();
    });
    test("Test invalid position at 5,5 as it started from 0,0", () => {
        const validPosition = new Position(5, 5);
        expect(board.isValidPosition(validPosition)).toEqual(false);
    });
    test("Test valid position at 0,0", () => {
        const validPosition = new Position(0, 0);
        expect(board.isValidPosition(validPosition)).toEqual(true);
    });
    test("Test valid position at 3,2", () => {
        const validPosition = new Position(3, 2);
        expect(board.isValidPosition(validPosition)).toEqual(true);
    });
});