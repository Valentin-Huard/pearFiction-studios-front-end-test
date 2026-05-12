import { Application } from 'pixi.js';
import { SlotMachine } from './app/SlotMachine';
import { PreloaderScreen } from './app/preloader';
/**
 * The main entry point of the application. It initializes the PIXI application, displays the preloader screen, loads the game assets, and then creates the SlotMachine instance.
 * The preloader screen is displayed while assets are being loaded, and is destroyed once loading is complete.
 */
(async () => {
  const app = new Application();
  await app.init({ background: '#6a6a6a', resizeTo: window });
  document.body.appendChild(app.canvas);

  const preloader = new PreloaderScreen(app);
  const textures = await preloader.load();
  preloader.destroy();

  new SlotMachine(app, textures);

})();
