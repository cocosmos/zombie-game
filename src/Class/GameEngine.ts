import { random } from "nanoid";
import {
  /* calculateAngle, */ calculateAngle,
  checkCollision,
  getRandomArbitrary,
  moveCharact,
} from "../utils/helper";
import { getRandomFloat } from "../utils/random";
import { GameEventDom, gameEvent } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Coord, Keys } from "../types/CommunType";
import { keyframes } from "styled-components";
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
    for (let index = 0; index < getRandomArbitrary(0, 20); index++) {
      this.enemies.push(
        new Enemy(
          { x: getRandomArbitrary(0, 1919), y: getRandomArbitrary(0, 940) },
          getRandomArbitrary(1, 3),
          this.character.position
        )
      );
    }
  }
  moveCharacter(keys: Keys) {
    this.character.keys = keys;
  }

  fire(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  over() {
    return true;
  }

  update() {
    this.updateCallback();
    if (
      this.character.keys.w ||
      this.character.keys.s ||
      this.character.keys.a ||
      this.character.keys.d
    ) {
      this.character.position = moveCharact(
        this.character.keys,
        this.character.position
      );
    }
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
