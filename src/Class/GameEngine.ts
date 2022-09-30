import { random } from "nanoid";
import { getRandomFloat } from "../utils/random";
import { GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Enemy } from "./Object/Enemy";
export class GameEngine {
  gameLoop: GameLoop;
  updateCallback: AnimateCallback;
  appDom!: HTMLElement;
  domEvent: GameEventDom;
  enemies: Enemy[] = [];
  bullets: Bullet[] = [];

  constructor() {
    this.gameLoop = new GameLoop(this.update.bind(this));
    this.updateCallback = () => null;
    this.domEvent = new GameEventDom();
  }
  init(updateCallback: AnimateCallback, appDom: HTMLElement) {
    this.appDom = appDom;

    this.updateCallback = updateCallback;
    this.gameLoop.start();
    /* this.enemies.push(
      new Enemy({ x: 100, y: 100 }, 0.1),
      new Enemy({ x: 100, y: 100 }, 0.2),
      new Enemy({ x: 100, y: 100 }, 0.3),
      new Enemy({ x: 100, y: 100 }, 0.4)
    ); */
  }
  fire() {
    this.bullets.push(new Bullet({ x: 1280, y: 646 }, { x: -11, y: 10 }));
  }
  over() {
    return true;
  }
  destroy() {
    this.gameLoop.stop();
  }
  update() {
    this.updateCallback();
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  }
}

export const gameEngine = new GameEngine();
