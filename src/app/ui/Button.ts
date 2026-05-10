import { Sprite } from "pixi.js";
import type { ButtonOptions } from "../utils/types";

/**
 * A wrapper around PIXI.Sprite to display a clickable button on the screen
 * The `onClick` callback is triggered when the button is clicked
 */
export class Button {
    readonly elem: Sprite;

    constructor(options: Partial<ButtonOptions>) {
        this.elem = new Sprite(options.texture);

        this.elem.width = options.width ?? 0;
        this.elem.height = options.height ?? 0;

        this.elem.x = options.x ?? 0;
        this.elem.y = options.y ?? 0;


        this.elem.eventMode = 'static'
        this.elem.cursor = 'pointer'

        if (options.onClick) {
            this.elem.on('pointertap', options.onClick);
        }

    }
}
