import {
  checkCollision,
  getRandomArbitrary,
  moveCharact,
} from "../utils/helper";
import { gameEvent, GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Keys, Status } from "../types/CommunType";
export class GameEngine {
  gameLoop: GameLoop;
  updateCallback: AnimateCallback;
  appDom!: HTMLElement;
  domEvent: GameEventDom;
  enemies: Enemy[] = [];
  touchedEnemies: Enemy[] = [];
  bullets: Bullet[] = [];
  character: Character = new Character();
  status: Status = "Start";

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
  }

  play() {
    this.enemies = [];
    this.status = "Play";
    this.character = new Character();
    this.makeEnemies();
  }

  makeEnemies() {
    for (let index = 0; index < /* getRandomArbitrary(0, 20) */ 1; index++) {
      this.enemies.push(
        new Enemy(
          {
            x: getRandomArbitrary(-100, gameEvent.gameSize.w + 100),
            y: getRandomArbitrary(-100, -5),
          },
          getRandomArbitrary(1, 3),
          this.character.position
        ),
        new Enemy(
          {
            x: getRandomArbitrary(-100, -5),
            y: getRandomArbitrary(-100, gameEvent.gameSize.h + 100),
          },
          getRandomArbitrary(1, 3),
          this.character.position
        ),
        new Enemy(
          {
            x: getRandomArbitrary(-100, gameEvent.gameSize.w + 100),
            y: getRandomArbitrary(
              gameEvent.gameSize.h,
              gameEvent.gameSize.h + 100
            ),
          },
          getRandomArbitrary(1, 3),
          this.character.position
        ),
        new Enemy(
          {
            x: getRandomArbitrary(
              gameEvent.gameSize.w,
              gameEvent.gameSize.w + 100
            ),
            y: getRandomArbitrary(-100, gameEvent.gameSize.h + 100),
          },
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
    if (this.character.out === true) {
      this.status = "Over";
    } else {
      if (this.status === "Play") {
        const allDead = this.enemies.every((e) => e.out === true);

        if (allDead) {
          this.status = "Win";
        }
      }
    }
  }

  destroy() {
    this.gameLoop.stop();
  }
}

export const gameEngine = new GameEngine();
