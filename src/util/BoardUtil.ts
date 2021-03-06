import { CellValue } from "./Enum";
import Point from "../interfaces/Point";
import { BoardRealisticSize } from "../interfaces/BoardRealisticSize";
import { BOARD_SIZE } from "./Settings";

export class BoardUtil {
  public static initializeEmptyGameArray(): CellValue[][] {
    const resultArray = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
      resultArray[i] = new Array(BOARD_SIZE).fill(CellValue.NULL);
    }
    return resultArray;
  }

  public static getNeighbors(element: Point): Point[] {
    const neighbors: Point[] = [];
    const neighborhood = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0]
    ];
    neighborhood.forEach(neighbor => {
      if (element.x + neighbor[0] >= 0 && element.y + neighbor[1] >= 0) {
        neighbors.push({
          x: element.x + neighbor[0],
          y: element.y + neighbor[1]
        });
      }
    });
    return neighbors;
  }

  public static getLimitedBoardSize(
    board: CellValue[][],
    overhead: number = 1
  ): BoardRealisticSize {
    let minVertical: number;
    let maxVertical: number;
    let minHorizontal: number;
    let maxHorizontal: number;
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] !== CellValue.NULL) {
          if (y < minVertical || minVertical === undefined) {
            minVertical = y;
          }
          if (y > maxVertical || maxVertical === undefined) {
            maxVertical = y;
          }
          if (x < minHorizontal || minHorizontal === undefined) {
            minHorizontal = x;
          }
          if (x > maxHorizontal || maxHorizontal === undefined) {
            maxHorizontal = x;
          }
        }
      }
    }
    return { 
      minVertical: minVertical - overhead < 0 ? 0 : minVertical - overhead, 
      maxVertical: maxVertical + overhead > BOARD_SIZE ? BOARD_SIZE : maxVertical + overhead,
      minHorizontal: minHorizontal - overhead < 0 ? 0 : minHorizontal - overhead,
      maxHorizontal: maxHorizontal + overhead > BOARD_SIZE ? BOARD_SIZE : maxHorizontal + overhead 
    };
  }
}
