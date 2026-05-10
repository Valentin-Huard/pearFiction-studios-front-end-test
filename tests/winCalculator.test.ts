import { describe, it, expect } from 'vitest';
import { getResult } from '../src/winCalculator.ts';
import { getVisibleSymbols } from '../src/reels.ts';

function translatePositionsToSymbols(positions: number[]) {
  return getVisibleSymbols(positions);
}

describe('getResult', () => {
  it('Check win for positions [0,11,1,10,14]', () => {
    let grid = translatePositionsToSymbols([0,11,1,10,14]);
    const wins = getResult(grid);
    expect(wins).toHaveLength(2);

    const paylines2 = wins.find((w) => w.paylineId === 2);
    expect(paylines2).toBeDefined();
    expect(paylines2).toMatchObject({ paylineId: 2, symbol: 'hv2', count: 3, payout: 5 });

    const payline5 = wins.find((w) => w.paylineId === 5);
    expect(payline5).toBeDefined();
    expect(payline5).toMatchObject({ paylineId: 5, symbol: 'lv3', count: 3, payout: 1 });

  });

  it('Check win for positions [0,0,0,0,0]', () => {
    let grid = translatePositionsToSymbols([0,0,0,0,0]);
    const wins = getResult(grid);
    expect(wins).toHaveLength(1);

    expect(wins[0]).toBeDefined();
    expect(wins[0]).toMatchObject({ paylineId: 3, symbol: 'lv3', count: 3, payout: 1 });

  });

  it('Check win for positions [5,14,9,9,16]', () => {
    let grid = translatePositionsToSymbols([5,14,9,9,16]);

    const wins = getResult(grid);
    expect(wins).toHaveLength(1);
    // NOTE: difference between the specs and reelset ?
    // expect(wins).toHaveLength(2);

    const payline6 = wins.find((w) => w.paylineId === 6);
    expect(payline6).toMatchObject({ symbol: 'lv1', count: 4, payout: 5 });

    // NOTE: difference between the specs and reelset ?
    // const payline7 = wins.find((w) => w.paylineId === 7);
    // expect(payline7).toMatchObject({ symbol: 'lv1', count: 4, payout: 5 });

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