import { GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Enemy } from "./Object/Enemy";
export class GameEngine {
  gameLoop: GameLoop;
  updateCallback: AnimateCallback;
  appDom!: HTMLElement;
  domEvent: GameEventDom;
  enemies: Enemy[] = [];
  constructor() {
    this.gameLoop = new GameLoop(this.update.bind(this));
    this.updateCallback = () => null;
    this.domEvent = new GameEventDom();
  }
  init(updateCallback: AnimateCallback, appDom: HTMLElement) {
    this.appDom = appDom;

    this.updateCallback = updateCallback;
    this.gameLoop.start();
    this.enemies.push(new Enemy({ x: 100, y: 100 }));
  }
  destroy() {
    this.gameLoop.stop();
  }
  update() {
    this.updateCallback();
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }
}

export const gameEngine = new GameEngine();
