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
    this.enemies.push(new Enemy({ x: 250, y: 20 }, 0.2, -90));
  }
  fire(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  over() {
    return true;
  }

  checkCollision(bullet: Bullet, enemy: Enemy) {
    if (
      bullet.position.x < enemy.position.x + 25 &&
      bullet.position.x + 5 > enemy.position.x - 25 &&
      bullet.position.y < enemy.position.y + 25 &&
      bullet.position.y + 5 > enemy.position.y - 25
    ) {
      enemy.out = true;
      bullet.out = true;
    }
  }
  update() {
    this.updateCallback();

    this.enemies.forEach((enemy) => {
      this.bullets.forEach((bullet) => {
        this.checkCollision(bullet, enemy);
        if (!bullet.out) {
          bullet.update();
        } else {
          bullet.destroy(this.bullets);
        }
      });
      //Enemy update
      if (!enemy.out) enemy.update();
    });
  }
  destroy() {
    this.gameLoop.stop();
  }
}

export const gameEngine = new GameEngine();
