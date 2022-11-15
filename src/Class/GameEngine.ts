import { checkCollision, currentTime, moveCharact } from "../utils/helper";
import { gameEvent, GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Keys, Status } from "../types/CommunType";

import { getRandomArbitrary, getRandomFloat } from "../utils/random";
import { GameSound } from "./GameSound";

export class GameEngine {
  gameLoop: GameLoop;
  updateCallback: AnimateCallback;
  appDom!: HTMLElement;
  domEvent: GameEventDom;
  gameSound: GameSound;
  enemies: Enemy[] = [];
  bullets: Bullet[] = [];
  character: Character = new Character();
  status: Status = "Start";
  allDead: boolean = false;
  dayStatus: { status: "Day" | "Night"; time: number } = {
    status: "Day",
    time: 0,
  };

  constructor() {
    this.gameLoop = new GameLoop(this.update.bind(this));
    this.updateCallback = () => null;
    this.domEvent = new GameEventDom();
    this.gameSound = new GameSound();
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
    this.gameSound.playZombies(true);
    console.log(currentTime());
  }
  /**
   * TODO: Refactor this function
   */
  menu() {
    console.log("menu");
  }
  /**
   * TODO: Refactor this function
   */
  wawe() {
    console.log("wawe");
  }

  /**
   * TODO: Refactor this function
   */

  makeEnemies() {
    for (let index = 0; index < /* getRandomArbitrary(0, 20) */ 3; index++) {
      this.enemies.push(
        new Enemy(
          {
            x: getRandomArbitrary(-100, gameEvent.gameSize.w + 100),
            y: getRandomArbitrary(-100, -5),
          },
          this.character.position,
          { level: 1, number: getRandomFloat(1, 4, 0) }
        ),
        new Enemy(
          {
            x: getRandomArbitrary(-100, -5),
            y: getRandomArbitrary(-100, gameEvent.gameSize.h + 100),
          },
          this.character.position,
          { level: 1, number: getRandomFloat(1, 4, 0) }
        ),
        new Enemy(
          {
            x: getRandomArbitrary(-100, gameEvent.gameSize.w + 100),
            y: getRandomArbitrary(
              gameEvent.gameSize.h,
              gameEvent.gameSize.h + 100
            ),
          },
          this.character.position,
          { level: 1, number: getRandomFloat(1, 4, 0) }
        ),
        new Enemy(
          {
            x: getRandomArbitrary(
              gameEvent.gameSize.w,
              gameEvent.gameSize.w + 100
            ),
            y: getRandomArbitrary(-100, gameEvent.gameSize.h + 100),
          },
          this.character.position,
          { level: 2, number: getRandomFloat(1, 2, 0) }
        )
      );
    }
  }

  moveCharacter(keys: Keys) {
    this.character.keys = keys;
  }

  fire(bullet: Bullet) {
    this.gameSound.playShot();
    this.character.shoot = true;
    this.bullets.push(bullet);
  }

  update() {
    this.updateCallback();

    if (
      (this.character.keys.w ||
        this.character.keys.s ||
        this.character.keys.a ||
        this.character.keys.d) &&
      this.status === "Play"
    ) {
      this.character.position = moveCharact(
        this.character.keys,
        this.character.position
      );
    }
    this.enemies.forEach((enemy) => {
      if (
        checkCollision(
          {
            position: this.character.position,
            size: this.character.size,
            out: this.character.out,
          },
          { position: enemy.position, size: enemy.size, out: enemy.out }
        )
      ) {
        enemy.out = true;
        this.character.out = true;
      }

      this.bullets.forEach((bullet) => {
        if (
          checkCollision(
            { position: bullet.position, size: bullet.size, out: bullet.out },
            { position: enemy.position, size: enemy.size, out: enemy.out }
          )
        ) {
          enemy.out = true;
          this.character.kills++;
        }

        if (!bullet.out) {
          bullet.update();
        } else {
          bullet.destroy(this.bullets);
        }
      });
      //Enemy update
      if (!enemy.out) {
        enemy.update();
      }
    });
    if (this.character.out === true) {
      this.gameSound.playZombies(false);
      this.status = "Over";
    } else {
      if (this.status === "Play") {
        this.allDead = this.enemies.every((e) => e.out === true);

        if (this.allDead) {
          this.gameSound.playZombies(false);
          this.status = "Win";
        }
      }
    }
    if (this.bullets.length === 0) {
      this.character.shoot = false;
    }
  }

  destroy() {
    this.gameLoop.stop();
  }
}

export const gameEngine = new GameEngine();
