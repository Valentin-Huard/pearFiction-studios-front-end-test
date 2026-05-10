import { describe, it, expect } from 'vitest';
import { checkPaywinOne } from '../src/winCalculator.ts';

describe('checkPaywinOne', () => {
  it('returns the correct grid for position [lv3, lv3, lv3, lv2,lv4] and line 1', () => {
    const wins = checkPaywinOne([['lv3', 'lv3', 'lv3', 'lv2', 'lv4']], 0);
    expect(typeof wins).not.toBe("boolean")
    expect(wins).toMatchObject({ paylineId: 1, symbol: 'lv3', count: 3 });
  });
});
