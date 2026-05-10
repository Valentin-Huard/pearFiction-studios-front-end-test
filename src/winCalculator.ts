import type { Win, Symbol } from "./utils/types";

export function checkPaywinOne(grid: Symbol[][], line: number) {
  let winNumbers: Win = { paylineId: 0, symbol: 'hv1', count: 0 };
  for (let i = 1; i < grid[line].length; i++) {
    if (grid[line][i] !== grid[line][i - 1]) {
      if (winNumbers.count >= 3) {
        return winNumbers;
      }
      return false;
    } else {
      winNumbers = { paylineId: line + 1, symbol: grid[line][i - 1], count: i + 1 };
    }
  }
  return winNumbers;
}
