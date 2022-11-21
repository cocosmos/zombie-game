import { currentTime } from "../utils/helper";
import { gameEvent, GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Status } from "../types/CommunType";

import { GameSound } from "./GameSound";
import { ZombieLevel1 } from "./Object/Zombies/ZombieLevel1";

export class GameEngine {
  gameLoop: GameLoop;
  updateCallback: AnimateCallback;
  appDom!: HTMLElement;
  gameSound: GameSound;
  character: Character;
  status: Status;
  allDead: boolean;
  enemies: Enemy[] = [];
  bullets: Bullet[] = [];

  /* dayStatus: { status: "Day" | "Night"; time: number } = {
    status: "Day",
    time: 0,
  }; */

  constructor() {
    this.gameLoop = new GameLoop(this.update.bind(this));
    this.updateCallback = () => null;
    this.gameSound = new GameSound();
    this.character = new Character();
    this.status = "Start";
    this.allDead = false;
  }
  init(updateCallback: AnimateCallback, appDom: HTMLElement) {
    this.appDom = appDom;
    this.enemies = [];
    this.updateCallback = updateCallback;
    this.gameLoop.start();
    console.log(this.gameSound);
  }

  play() {
    this.enemies = [];
    this.status = "Play";
    this.character = new Character();

    this.makeEnemies();
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

  makeEnemies() {
    this.gameSound.playZombies(true);
    this.enemies = [
      new ZombieLevel1({
        x: 200,
        y: 200,
      }),
    ];
    /* for (let index = 0; index <  getRandomArbitrary(0, 20) ; index++) {
      this.enemies.push(
        new ZombieLevel1({
          x: getRandomArbitrary(-100, gameEvent.gameSize.w + 100),
          y: getRandomArbitrary(-100, -5),
        }),
        new ZombieLevel2({
          x: getRandomArbitrary(-100, -5),
          y: getRandomArbitrary(-100, gameEvent.gameSize.h + 100),
        }),
        new Enemy({
          x: getRandomArbitrary(-100, gameEvent.gameSize.w + 100),
          y: getRandomArbitrary(
            gameEvent.gameSize.h,
            gameEvent.gameSize.h + 100
          ),
        }),
        new Enemy({
          x: getRandomArbitrary(
            gameEvent.gameSize.w,
            gameEvent.gameSize.w + 100
          ),
          y: getRandomArbitrary(-100, gameEvent.gameSize.h + 100),
        })
      );
    } */
    console.log(this.character);
  }

  fire() {
    this.gameSound.playShot();
    this.bullets.push(this.character.fire());
  }

  update() {
    this.updateCallback();

    if (this.status === "Play") {
      this.character.moveCharacter();
    }
    this.enemies.forEach((enemy) => {
      if (enemy.checkCollision(this.character)) {
        this.character.dead();
      }

      this.bullets.forEach((bullet) => {
        if (enemy.checkCollision(bullet)) {
          this.character.setKills();
          enemy.dead();
        }

        if (!bullet.out) {
          bullet.update();
          //bullet.move();
        } else {
          this.character.setShoot(false);
          bullet.destroy(this.bullets);
        }
      });
      //Enemy update
      if (!enemy.out) {
        enemy.move(this.character.getPosition());
      }
    });
    if (this.character.out) {
      this.gameSound.playZombies(false);
      this.status = "Over";
    } else {
      if (this.status === "Play") {
        this.character.update();
        this.allDead = this.enemies.every((e) => e.out === true);

        const numberDead = this.enemies.filter((enemy) => enemy.out).length;

        if (numberDead > 10) {
          this.enemies = this.enemies.filter(function (obj) {
            return obj.out !== true;
          });
          //remove an enemy who is out  of the screen to make the game more fluid and not too heavy for the browser to handle
        }

        if (this.allDead) {
          this.gameSound.playZombies(false);
          this.status = "Win";
        }
      }
    }
  }

  destroy() {
    this.gameLoop.stop();
  }

  getCharacter() {
    return this.character;
  }
  getEnemies() {
    return this.enemies;
  }
  getBullets() {
    return this.bullets;
  }
  getStatus() {
    return this.status;
  }
}

export const gameEngine = new GameEngine();
