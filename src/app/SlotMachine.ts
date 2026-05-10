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

export class SlotMachine {

    private positions: number[];
    private readonly container: Container;
    private readonly reel: Reel;
    private readonly button: Button;
    private readonly label: Label;

    constructor(app: Application, container: Container, textures: Record<string, any>) {

        this.positions = [0, 0, 0, 0, 0];

        this.container = container;

        const margin = 50;
        const symbolSize = 150;
        const symbolStep = 160;
        const reelWidth = (COLS - 1) * symbolStep + symbolSize;
        const reelStartX = (app.screen.width - reelWidth) / 2;
        const reelStartY = margin;

        this.reel = new Reel(COLS, ROWS, {
            textures: textures,
            width: symbolSize,
            height: symbolSize,
            x: reelStartX,
            y: reelStartY,
            stepX: symbolStep,
            stepY: symbolStep,
        });
        
        for (const col of this.reel.grid) {
            for (const symbol of col) {
                this.container.addChild(symbol);
            }
        }

        this.button = new Button({
            text: "Spin",
            texture: textures.spinButton,
            width: 150,
            height: 150,
            fontSize: 28,
            x: app.screen.width - 200,
            y: app.screen.height - 200,
            onClick: async () => {
                this.spin();
            }
        });

        this.container.addChild(this.button.elem);

        this.label = new Label({
            text: 'Total wins: 0',
            style: {
                fill: '#ffffff',
                fontSize: 20,
                fontFamily: 'Arial',
            },
            x: app.screen.width / 2,
            y: app.screen.height * 3 / 4
        });

        this.container.addChild(this.label.elem);

        this.updateSymbols();
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
