import type { Win } from "./utils/types";


export function winDisplayText(wins: Win[]): string {
    let total = 0;
    let lines = wins.map((win) => {
        total += win.payout;
        return `- payline ${win.paylineId}, ${win.symbol} x${win.count}, ${win.payout}`;
    });
    let text = `Total wins: ${total}` + (lines.length > 0 ? '\n' + lines.join('\n') : '');
    return text;
}
