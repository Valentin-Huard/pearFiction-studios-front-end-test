import type { Symbol } from "./utils/types";
import { Reelset } from "./utils/const";

export function getVisibleSymbols(positions: number[]): Symbol[][] {
    const maxLine = 5;
    const maxColumn = 5;
    const grid: Symbol[][] = [];

    for (let row = 0; row < maxLine; row++) {
        let rowSymbols: Symbol[] = [];
        for (let col = 0; col < maxColumn; col++) {
            let band = Reelset[col];
            // Push the symbol for the current position and add row index to get the next symbol in the band
            // Use modulo to wrap around the band if the value exceeds the length (0-19)
            rowSymbols.push(band[(positions[col] + row) % band.length]);
        }
        grid.push(rowSymbols);
    }
    return grid;
}
