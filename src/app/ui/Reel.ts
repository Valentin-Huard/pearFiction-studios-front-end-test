import { Sprite } from 'pixi.js';
import type { Symbol } from '../../utils/types.ts';
import type { ReelOptions } from '../utils/types.ts';

/**
 * Manages the grid of symbols displayed on the slot machine
 * The `update()` method updates the textures of the symbols based on the provided grid
 */
export class Reel {
  readonly grid: Sprite[][];
  readonly textures: Record<string, any>;

  constructor(col: number, row: number, option : ReelOptions) {
    this.textures = option.textures;

    this.grid = [];
    for (let c = 0; c < col; c++) {
      this.grid[c] = [];
      for (let r = 0; r < row; r++) {
        const symbol = new Sprite(this.textures['hv1']);
        
        symbol.width = option.width;
        symbol.height = option.height;
        symbol.x = option.x + option.stepX * c;
        symbol.y = option.y + option.stepY * r;

        this.grid[c][r] = symbol;
      }
    }
  }

  update(grid: Symbol[][]): void {
    for (let row = 0; row < this.grid[0].length; row++) {
      for (let col = 0; col < this.grid.length; col++) {
        const symbol = this.grid[col][row];
        symbol.texture = this.textures[grid[row][col]];
      }
    }
  }
}
