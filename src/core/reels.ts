import type { Symbol } from "../utils/types";
import { REELSET } from "../utils/const";

/**
 * Computes the visible symbols on the slot machine reels based on their current positions
 * @param positions An array of numbers representing the current positions of each reel
 * @returns A 2D array of symbols representing the visible symbols on the reels
 */
export function getVisibleSymbols(positions: number[]): Symbol[][] {
    const maxLine = 5;
    const maxColumn = 5;
    const grid: Symbol[][] = [];

    for (let row = 0; row < maxLine; row++) {
        let rowSymbols: Symbol[] = [];
        for (let col = 0; col < maxColumn; col++) {
            let band = REELSET[col];
            // Push the symbol for the current position and add row index to get the next symbol in the band
            // Use modulo to wrap around the band if the value exceeds the length (0-19)
            rowSymbols.push(band[(positions[col] + row) % band.length]);
        }
        grid.push(rowSymbols);
    }
    return grid;
}
