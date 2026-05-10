export type ButtonOptions = {
    text: string;
    width: number;
    height: number;
    fontSize: number;
    texture: any;
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
    textures: any;
    x: number;
    y: number;
    stepX: number;
    stepY: number;
}