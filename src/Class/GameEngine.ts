import { currentTime } from "../utils/helper";
import { gameEvent, GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Status } from "../types/CommunType";

import { GameSound } from "./GameSound";
import { GameObject } from "./Object/GameObject";
import { GameLevel } from "./GameLevel";

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
  gameLevel: GameLevel;

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
    this.gameLevel = new GameLevel(1);
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
    this.gameLevel = new GameLevel(1);
    this.gameSound.playZombies(true);
    this.enemies = this.gameLevel.getEnemies();
  }

  fire() {
    this.gameSound.playShot();
    this.bullets.push(this.character.fire());
  }

  update() {
    let bulletsAlives: GameObject[] = [];
    this.updateCallback();

    if (this.status === "Play") {
      this.character.moveCharacter();
    }
    //Bullets
    this.bullets.forEach((bullet) => {
      bullet.update();
      if (!bullet.getOut()) {
        bulletsAlives.push(bullet);
      }
    });
    this.enemies.forEach((enemy) => {
      if (enemy.checkCollision(this.character)) {
        this.character.dead();
      }
      //needed a new array to avoid the error of the array changing during the loop
      bulletsAlives.forEach((bullet) => {
        if (enemy.checkCollision(bullet)) {
          enemy.dead();
          bullet.destroy(bulletsAlives);
          this.character.addKill();
        }
      });
      if (bulletsAlives.length === 0) {
        this.bullets = [];
        this.character.setShoot(false);
      }
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
          const maxLevel = 5;

          if (this.gameLevel.getLevel() === maxLevel) {
            this.status = "Win";
            this.gameSound.playZombies(false);
          } else {
            this.gameLevel.nextLevel();
            this.enemies = this.gameLevel.getEnemies();
            this.gameSound.playZombies(true);
          }
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
