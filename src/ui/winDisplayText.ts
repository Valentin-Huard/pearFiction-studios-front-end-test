import type { Win } from "../utils/types";

/**
 * Generates a display string summarizing the total wins and details of each winning payline
 * @param wins An array of Win objects representing the winning paylines and their payouts
 * @returns A string summarizing the total wins and details of each winning payline
 */
export function winDisplayText(wins: Win[]): string {
    let total = 0;
    let lines = wins.map((win) => {
        total += win.payout;
        return `- payline ${win.paylineId}, ${win.symbol} x${win.count}, ${win.payout}`;
    });
    let text = `Total wins: ${total}` + (lines.length > 0 ? '\n' + lines.join('\n') : '');
    return text;
}
