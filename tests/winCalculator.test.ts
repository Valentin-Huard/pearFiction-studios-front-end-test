import { describe, it, expect } from 'vitest';
import { checkPaywinOne, getResult } from '../src/winCalculator.ts';
import { getVisibleSymbols } from '../src/reels.ts';

function translatePositionsToSymbols(positions: number[]) {
  return getVisibleSymbols(positions);
}

describe('checkPaywinOne', () => {
  it('returns the correct grid for position [lv3, lv3, lv3, lv2,lv4] and line 1', () => {
    const wins = checkPaywinOne([['lv3', 'lv3', 'lv3', 'lv2', 'lv4']], 0);
    expect(typeof wins).not.toBe("boolean")
    expect(wins).toMatchObject({ paylineId: 1, symbol: 'lv3', count: 3 });
  });
});

describe('getResult', () => {
  it('Check win for positions [0,11,1,10,14]', () => {
    let grid = translatePositionsToSymbols([0,11,1,10,14]);
    const wins = getResult(grid);

    const paylines2 = wins.find((w) => w.paylineId === 2);
    expect(paylines2).toBeDefined();
    expect(paylines2).toMatchObject({ paylineId: 2, symbol: 'hv2', count: 3});

    const payline5 = wins.find((w) => w.paylineId === 5);
    expect(payline5).toBeDefined();
    expect(payline5).toMatchObject({ paylineId: 5, symbol: 'lv3', count: 3});

  });

  it('Check win for positions [0,0,0,0,0]', () => {
    let grid = translatePositionsToSymbols([0,0,0,0,0]);
    const wins = getResult(grid);

    expect(wins[0]).toBeDefined();
    expect(wins[0]).toMatchObject({ paylineId: 3, symbol: 'lv3', count: 3});

  });

  it('Check win for positions [5,14,9,9,16]', () => {
    let grid = translatePositionsToSymbols([5,14,9,9,16]);

    const wins = getResult(grid);
    expect(wins).toHaveLength(1);

    const pl6 = wins.find((w) => w.paylineId === 6);
    expect(pl6).toMatchObject({ symbol: 'lv1', count: 4 });

  });

  it('Check win for positions [1,16,2,15,0]', () => {
    let grid = translatePositionsToSymbols([1,16,2,15,0]);
    const wins = getResult(grid);
    expect(wins).toHaveLength(0);
  });

  it('Check win for positions [18,9,2,0,12]', () => {
    let grid = translatePositionsToSymbols([18,9,2,0,12]);
    const wins = getResult(grid);
    expect(wins).toHaveLength(0);

  });
});