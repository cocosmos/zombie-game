import { currentTime } from "../utils/helper";
import { gameEvent, GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Keys, Status } from "../types/CommunType";

import { getRandomArbitrary, getRandomFloat } from "../utils/random";
import { GameSound } from "./GameSound";
import { ZombieLevel1 } from "./Object/Zombies/ZombieLevel1";
import { ZombieLevel2 } from "./Object/Zombies/ZombieLevel2";

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
  /* dayStatus: { status: "Day" | "Night"; time: number } = {
    status: "Day",
    time: 0,
  }; */

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
    console.log(this.character);
  }

  play() {
    this.enemies = [];
    this.status = "Play";
    //this.character = new Character();

    this.makeEnemies();
    this.gameSound.playZombies(true);
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
    for (let index = 0; index < /* getRandomArbitrary(0, 20) */ 2; index++) {
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
    }
    console.log(this.character);
  }

  fire(bullet: Bullet) {
    this.character.setShoot(true);
    this.gameSound.playShot();
    this.bullets.push(bullet);
  }

  update() {
    this.updateCallback();

    if (this.status === "Play") {
      this.character.moveCharacter(this.domEvent.keys);
    }
    this.enemies.forEach((enemy) => {
      if (enemy.checkCollision(this.character)) {
        this.character.dead();
      }

      this.bullets.forEach((bullet) => {
        if (enemy.checkCollision(bullet)) {
          this.character.setKills(this.character.kills + 1);
          enemy.dead();
        }

        if (!bullet.out) {
          bullet.update();
          //bullet.move();
        } else {
          bullet.destroy(this.bullets);
        }
      });
      //Enemy update
      if (!enemy.out) {
        // enemy.update();
        enemy.move(this.character.position);
      }
    });
    if (this.character.out) {
      this.gameSound.playZombies(false);
      this.status = "Over";
    } else {
      if (this.status === "Play") {
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
    if (this.bullets.length === 0) {
      this.character.setShoot(false);
    }
  }

  destroy() {
    this.gameLoop.stop();
  }
}

export const gameEngine = new GameEngine();
