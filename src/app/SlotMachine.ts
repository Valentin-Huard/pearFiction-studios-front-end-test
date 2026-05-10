import { Container } from 'pixi.js';
import type { Application } from 'pixi.js';
import { getVisibleSymbols } from '../core/reels.ts';
import { getResult } from '../core/winCalculator.ts';
import { Button } from './ui/Button.ts';
import { Reel } from './ui/Reel.ts';
import { Label } from './ui/Label.ts';
import { REELSET } from '../utils/const.ts';
import { winDisplayText } from '../ui/winDisplayText.ts';

const COLS = 5;
const ROWS = 3;
/**
 * Manages the main game screen, including the reels, spin button, and win display label
 * The `spin()` method randomizes the reel positions and updates the display accordingly
 * The `updateSymbols()` method refreshes the reel textures and win label based on the current positions
 */
export class SlotMachine {

    private positions: number[];
    private readonly app: Application;
    private readonly container: Container;
    private readonly reel: Reel;
    private readonly button: Button;
    private readonly label: Label;

    constructor(app: Application, container: Container, textures: Record<string, any>) {

        this.app = app;
        this.positions = [0, 0, 0, 0, 0];
        this.container = container;

        this.reel = new Reel(COLS, ROWS, {
            textures,
            width: 0, height: 0,
            x: 0, y: 0,
            stepX: 0, stepY: 0,
        });

        for (const col of this.reel.grid) {
            for (const symbol of col) {
                this.container.addChild(symbol);
            }
        }

        this.button = new Button({
            texture: textures.spinButton,
            width: 150,
            height: 150,
            x: 0, y: 0,
            onClick: async () => { this.spin(); }
        });
        this.container.addChild(this.button.elem);

        this.label = new Label({
            text: 'Total wins: 0',
            style: { fill: '#ffffff', fontSize: 28, fontFamily: 'Arial' },
            x: 0, y: 0,
        });
        this.container.addChild(this.label.elem);

        this.layout();
        app.renderer.on('resize', () => this.layout());
        this.updateSymbols();
    }

    /**
     * Calculates the layout of the reels, button, and label based on the current screen size and resizes them
     */
    private layout(): void {
        const screenWidth = this.app.screen.width;
        const screenHeight = this.app.screen.height;
        const margin = 50;
        const buttonSize = 150;

        const reelZoneH = screenHeight * 2 / 3;
        const uiZoneY = screenHeight * 2 / 3;

        const availW = screenWidth - 2 * margin;
        const availH = reelZoneH - 2 * margin;

        const symbolSize = Math.floor(Math.min(availW / COLS, availH / ROWS));
        const gap = Math.max(5, Math.floor(symbolSize * 0.05));
        const stepX = symbolSize + gap;
        const stepY = symbolSize + gap;

        const reelWidth = (COLS - 1) * stepX + symbolSize;
        const reelHeight = (ROWS - 1) * stepY + symbolSize;
        const reelStartX = (screenWidth - reelWidth) / 2;
        const reelStartY = margin + (reelZoneH - 2 * margin - reelHeight) / 2;

        this.reel.resize(reelStartX, reelStartY, symbolSize, stepX, stepY);

        this.button.elem.width = buttonSize;
        this.button.elem.height = buttonSize;

        const labelY = uiZoneY + margin;
        const labelCenterY = labelY + 14;

        this.label.elem.x = reelStartX;
        this.label.elem.y = labelY;

        this.button.elem.x = reelStartX + reelWidth - buttonSize;
        this.button.elem.y = labelCenterY - buttonSize / 2;
    }

    private spin(){
        this.positions = [];
        for (const roll of REELSET) {
            this.positions.push(Math.floor(Math.random() * roll.length));
        }
        this.updateSymbols();
    }

    private updateSymbols(){
        const grid = getVisibleSymbols(this.positions);
        this.reel.update(grid);
        const wins = getResult(grid);
        this.label.update(winDisplayText(wins));
    }
}
