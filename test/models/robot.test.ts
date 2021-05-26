import { Direction } from "../../src/models/direction";
import { Position } from "../../src/models/position";
import { Robot } from "../../src/models/robot";
import { placeRobot } from "../helper";


describe("Test robot", () => {
    let robot: Robot;
    beforeEach(() => {
        robot = new Robot();
    });
    test("Test robot place", () => {
        const x = 1;
        const y = 1;
        const newPosition = new Position(x, y);
        const dir = Direction.EAST;
        robot.place(newPosition, dir);
        expect(robot.position.x).toEqual(x);
        expect(robot.position.y).toEqual(y);
        expect(robot.direction).toEqual(dir);
    });
    test("Test move before placed robot, should throw error", () => {
        const x = 1;
        const y = 1;
        const newPosition = new Position(x, y);
        expect(() => robot.move(newPosition)).toThrowError("position should not null");
    });

    test("Test success move after place robot", () => {
        const x = 1;
        const y = 1;
        const newPosition = new Position(x, y);
        placeRobot(robot);
        robot.move(newPosition);
        expect(robot.position.x).toEqual(x);
        expect(robot.position.y).toEqual(y);
    });

    test("Test get next position before placed robot, should throw error", () => {
        expect(() => robot.getNextPosition()).toThrowError("position should not null");
    });

    test("Test get next position from North", () => {
        placeRobot(robot, Direction.NORTH, 1, 1);
        const result = robot.getNextPosition();
        expect(result.x).toEqual(1);
        expect(result.y).toEqual(2);
    });

    test("Test get next position from West", () => {
        placeRobot(robot, Direction.WEST, 1, 1);
        const result = robot.getNextPosition();
        expect(result.x).toEqual(0);
        expect(result.y).toEqual(1);
    });

    test("Test get next position from South", () => {
        placeRobot(robot, Direction.SOUTH, 1, 1);
        const result = robot.getNextPosition();
        expect(result.x).toEqual(1);
        expect(result.y).toEqual(0);
    });
    test("Test get next position from East", () => {
        placeRobot(robot, Direction.EAST, 1, 1);
        const result = robot.getNextPosition();
        expect(result.x).toEqual(2);
        expect(result.y).toEqual(1);
    });
    test("Test invalid direction, when get next position", () => {
        placeRobot(robot, null);
        expect(() => robot.getNextPosition()).toThrowError("The robot direction is invalid");
    });

    test("Test invalid direction, when turn left",()=>{
        placeRobot(robot, null);
        expect(() => robot.turnLeft()).toThrowError("The robot direction is invalid");
    });

    test("Test turn left from North",()=>{
        placeRobot(robot, Direction.NORTH);
        robot.turnLeft();
        expect(robot.direction).toEqual(Direction.WEST);
    });

    test("Test turn left from West",()=>{
        placeRobot(robot, Direction.WEST);
        robot.turnLeft();
        expect(robot.direction).toEqual(Direction.SOUTH);
    });

    test("Test turn left from South",()=>{
        placeRobot(robot, Direction.SOUTH);
        robot.turnLeft();
        expect(robot.direction).toEqual(Direction.EAST);
    });

    test("Test turn left from East",()=>{
        placeRobot(robot, Direction.EAST);
        robot.turnLeft();
        expect(robot.direction).toEqual(Direction.NORTH);
    });

    test("Test invalid direction, when turn right",()=>{
        placeRobot(robot, null);
        expect(() => robot.turnRight()).toThrowError("The robot direction is invalid");
    });

    test("Test turn right from North",()=>{
        placeRobot(robot, Direction.NORTH);
        robot.turnRight();
        expect(robot.direction).toEqual(Direction.EAST);
    });
    test("Test turn right from West",()=>{
        placeRobot(robot, Direction.WEST);
        robot.turnRight();
        expect(robot.direction).toEqual(Direction.NORTH);
    });

    test("Test turn right from South",()=>{
        placeRobot(robot, Direction.SOUTH);
        robot.turnRight();
        expect(robot.direction).toEqual(Direction.WEST);
    });

    test("Test turn right from East",()=>{
        placeRobot(robot, Direction.EAST);
        robot.turnRight();
        expect(robot.direction).toEqual(Direction.SOUTH);
    });
});