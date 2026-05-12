// This file defines TypeScript types for the options objects used to create UI components

import type { Texture } from "pixi.js";

export type ButtonOptions = {
    text: string;
    width: number;
    height: number;
    fontSize: number;
    texture: Texture;
    x: number;
    y: number;
    onClick: () => void;
}

export type TextOptions = {
    text: string;
    style: {
        fill: string;
        fontSize: number;
        fontFamily: string;
    };
    x: number;
    y: number;
}

export type ReelOptions = {
    width: number;
    height: number;
    textures: TextureRecord;
    x: number;
    y: number;
    stepX: number;
    stepY: number;
}

export type TextureRecord = Record<string, Texture>;
