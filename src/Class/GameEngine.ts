import { random } from "nanoid";
import {
  /* calculateAngle, */ calculateAngle,
  checkCollision,
  getRandomArbitrary,
} from "../utils/helper";
import { getRandomFloat } from "../utils/random";
import { GameEventDom, gameEvent } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
export class GameEngine {
  gameLoop: GameLoop;
  updateCallback: AnimateCallback;
  appDom!: HTMLElement;
  domEvent: GameEventDom;
  enemies: Enemy[] = [];
  bullets: Bullet[] = [];
  character: Character = new Character();

  constructor() {
    this.gameLoop = new GameLoop(this.update.bind(this));
    this.updateCallback = () => null;
    this.domEvent = new GameEventDom();
  }
  init(updateCallback: AnimateCallback, appDom: HTMLElement) {
    this.appDom = appDom;
    this.enemies = [];
    this.updateCallback = updateCallback;
    this.gameLoop.start();
    for (let index = 0; index < 5; index++) {
      this.enemies.push(
        new Enemy(
          { x: getRandomArbitrary(0, 1919), y: getRandomArbitrary(0, 940) },
          3,
          this.character.position
        )
      );
    }
  }

  fire(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  over() {
    return true;
  }

  /* checkCollision(bullet: Bullet, enemy: Enemy) {
    if (
      bullet.position.x < enemy.position.x + 25 &&
      bullet.position.x + 5 > enemy.position.x - 25 &&
      bullet.position.y < enemy.position.y + 25 &&
      bullet.position.y + 5 > enemy.position.y - 25
    ) {
      enemy.out = true;
      bullet.out = true;
    }
  } */
  update() {
    this.updateCallback();

    this.enemies.forEach((enemy) => {
      if (
        checkCollision(
          { position: this.character.position, size: this.character.size },
          { position: enemy.position, size: enemy.size }
        )
      ) {
        enemy.out = true;
        this.character.out = true;
      }
      this.bullets.forEach((bullet) => {
        if (
          checkCollision(
            { position: bullet.position, size: bullet.size },
            { position: enemy.position, size: enemy.size }
          )
        ) {
          enemy.out = true;
          bullet.out = true;
        }

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
