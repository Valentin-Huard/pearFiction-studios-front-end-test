// This file defines TypeScript types for the core game logic

export type Symbol = 'hv1' | 'hv2' | 'hv3' | 'hv4' | 'lv1' | 'lv2' | 'lv3' | 'lv4';

export type Win = {
  paylineId: number;
  symbol: Symbol;
  count: number;
  payout: number;
};

export type Coord = [number, number];
