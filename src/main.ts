import { Application } from 'pixi.js';
import { SlotMachine } from './app/SlotMachine';
import { PreloaderScreen } from './app/preloader';

(async () => {
  const app = new Application();
  await app.init({ background: '#1a1a2e', resizeTo: window });
  document.body.appendChild(app.canvas);

  const preloader = new PreloaderScreen(app);
  const textures = await preloader.load();
  preloader.destroy();

  new SlotMachine(app, textures);

})();
