import { PAYLINES, PAYTABLE } from "../utils/const";
import type { Win, Symbol } from "../utils/types";

/**
 * Calculates the winning paylines and their corresponding payouts based on the current grid of symbols
 * @param grid A 2D array of symbols representing the current state of the slot machine reels
 * @returns An array of Win objects representing the winning paylines and their payouts
 */
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

        if (matchCount >= 3){
            let payout = PAYTABLE[firstSymbol][matchCount];
            wins.push({ paylineId: i + 1, symbol: firstSymbol, count: matchCount, payout: payout });
        }
    }

    return wins;
}