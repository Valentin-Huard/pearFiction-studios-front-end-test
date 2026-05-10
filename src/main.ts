import { Application, Assets, Container } from 'pixi.js';
import { SlotMachine } from './app/SlotMachine';
import { SYMBOLS } from './utils/const';

(async () => {
  const app = new Application();
  await app.init({ background: '#1a1a2e', resizeTo: window });
  document.body.appendChild(app.canvas);

  const container = new Container();

  app.stage.addChild(container);

  const buttonTexture = await Assets.load(`./assets/spin_button.png`);

  let textures: Record<string, any> = {
    'spinButton': buttonTexture
  };

  for (const symbol of SYMBOLS) {
    textures[symbol] = await Assets.load(`./assets/${symbol}_symbol.png`);
  }

  new SlotMachine(app, container, textures);

})();
