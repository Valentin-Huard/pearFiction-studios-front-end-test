import { describe, it, expect } from 'vitest';
import { winDisplayText } from '../src/winDisplayText.ts';

describe('winDisplayText', () => {
  it('No wins', () => {
    expect(winDisplayText([])).toBe('Total wins: 0');
  });

  it('Single win', () => {
    const wins = [{ paylineId: 1, symbol: 'hv1' as const, count: 5, payout: 50 }];
    const text = winDisplayText(wins);
    expect(text).toBe('Total wins: 50\n- payline 1, hv1 x5, 50');
  });

  it('Multiple wins', () => {
    const wins = [
      { paylineId: 2, symbol: 'hv2' as const, count: 3, payout: 5 },
      { paylineId: 5, symbol: 'lv3' as const, count: 3, payout: 1 },
    ];
    const text = winDisplayText(wins);
    expect(text).toBe('Total wins: 6\n- payline 2, hv2 x3, 5\n- payline 5, lv3 x3, 1');
  });
});