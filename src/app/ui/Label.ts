import { Text } from 'pixi.js';
import type { TextOptions } from '../utils/types';

export class Label {
    readonly elem: Text;  

    constructor(options: Partial<TextOptions>) {
        this.elem = new Text({ text: options.text ?? '', style: { 
            fill: options.style?.fill ?? '#ffffff',
            fontSize: options.style?.fontSize ?? 20,
            fontFamily: options.style?.fontFamily ?? 'Arial',
        }});

        this.elem.anchor.set(0.5, 0);
        this.elem.x = options.x ?? 0;
        this.elem.y = options.y ?? 0;

    }

    update(text: string): void {
        this.elem.text = text;
    }
}
