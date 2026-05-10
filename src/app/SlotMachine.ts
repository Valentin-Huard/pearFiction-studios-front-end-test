import { Container } from 'pixi.js';
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

    constructor(container: Container, textures: Record<string, any>) {

        this.positions = [0, 0, 0, 0, 0];

        this.container = container;

        this.reel = new Reel(COLS, ROWS, {
            textures: textures,
            width: 150,
            height: 150,
            x: 160,
            y: 160,
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
            x: 600,
            y: 600,
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
            x: 500, 
            y: 600
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
