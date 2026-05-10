import { PAYLINES } from "./utils/const";
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
export function getResult(grid: Symbol[][]) {
    const wins: Win[] = [];
    // Use the Battleship game method
    // Iterate over each payline and check if the symbols match for a given position
    for (let i = 0; i < PAYLINES.length; i++) {
        const payline = PAYLINES[i];

        const [startRow, startCol] = payline[0];
        const firstSymbol = grid[startRow][startCol];

        let matchCount = 1;
        for (let j = 1; j < payline.length; j++) {
            const [row, col] = payline[j];
            if (grid[row][col] === firstSymbol) {
                matchCount++;
            } else {
                break;
            }
        }
        if (matchCount >= 3)
            wins.push({ paylineId: i + 1, symbol: firstSymbol, count: matchCount });
    }

    return wins;
}