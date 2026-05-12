import { describe, it, expect } from 'vitest';
import { getVisibleSymbols } from '../src/core/reels.ts';

describe('getVisibleSymbols', () => {
  it('returns the correct grid for position [0,0,0,0,0]', () => {
    const grid = getVisibleSymbols([0, 0, 0, 0, 0]);
    expect(grid[0]).toEqual(['hv2', 'hv1', 'lv1', 'hv2', 'lv3']);
    expect(grid[1]).toEqual(['lv3', 'lv2', 'hv2', 'lv2', 'lv4']);
    expect(grid[2]).toEqual(['lv3', 'lv3', 'lv3', 'hv3', 'hv2']);
  });

  it('returns the correct grid for positions [18,9,2,0,12]', () => {
    const grid = getVisibleSymbols([18, 9, 2, 0, 12]);
    expect(grid[0]).toEqual(['lv3', 'hv4', 'lv3', 'hv2', 'lv2']);
    expect(grid[1]).toEqual(['hv2', 'lv3', 'lv4', 'lv2', 'hv4']);
    expect(grid[2]).toEqual(['hv2', 'hv2', 'hv3', 'hv3', 'hv1']);
  });

  it('wraps band positions correctly', () => {
    // Asking for the last item of band 0 (length 20), row 0 → index 19 → 'hv2'
    const grid = getVisibleSymbols([19, 0, 0, 0, 0]);
    expect(grid[0][0]).toBe('hv2');
    // Row 1 wraps to index (19+1) % 20 = 0 → 'hv2'
    expect(grid[1][0]).toBe('hv2');
  });
});
