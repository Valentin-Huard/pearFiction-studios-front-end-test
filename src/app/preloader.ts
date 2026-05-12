import { Assets, Container, Text } from 'pixi.js';
import type { Application } from 'pixi.js';
import type { TextureRecord } from './utils/types';
import { SYMBOLS } from '../utils/const';

export class PreloaderScreen {
  private readonly app: Application;
  private readonly container: Container;
  private readonly label: Text;

  constructor(app: Application) {
    this.app = app;

    this.container = new Container();

    this.label = new Text({
      text: '0%',
      style: {
        fill: '#ffffff',
        fontSize: 30,
        fontFamily: 'Arial',
        fontWeight: 'bold',
      },
      x: this.app.screen.width / 2,
      y: this.app.screen.height / 2,
    });
    this.label.anchor.set(0.5);
    this.container.addChild(this.label);

    app.stage.addChild(this.container);
  }

  async load(): Promise<TextureRecord> {

    const textures: TextureRecord = {};

    try {
      textures['spinButton'] = await Assets.load(`./assets/spin_button.png`);
    } catch {
      this.label.text = 'Loading failed. Please refresh. If the problem persists, contact support.';
      throw new Error(`Failed to load: spinButton`);
    }

    for (let i = 0; i < SYMBOLS.length; i++) {
      const symbol = SYMBOLS[i];
      try {
        textures[symbol] = await Assets.load(`./assets/${symbol}_symbol.png`);
        this.label.text = `${Math.round(((i + 1) / SYMBOLS.length) * 100)}%`;
      } catch {
        this.label.text = 'Loading failed. Please refresh. If the problem persists, contact support.';
        throw new Error(`Failed to load: ${symbol}`);
      }
    }


    return textures;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
