import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Status } from "../types/CommunType";

import { GameSound } from "./GameSound";
import { GameObject } from "./Object/GameObject";
import { GameLevel } from "./GameLevel";
import { GameClock } from "./GameClock";
import { Inanimate } from "./Object/Inanimate";

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
  clock: GameClock;
  objects: Inanimate[] = [];

  constructor() {
    this.gameLoop = new GameLoop(this.update.bind(this));
    this.updateCallback = () => null;
    this.gameSound = new GameSound();
    this.character = new Character();
    this.status = "Play";
    this.allDead = false;
    this.gameLevel = new GameLevel(1);
    this.clock = new GameClock(28800);
    this.makeMap();
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
    this.clock = new GameClock(28800);
    this.gameSound.playZombies(true);
    this.enemies = this.gameLevel.getEnemies(this.clock.getStatus());
  }

  pause(status: Status) {
    this.status = status;
    this.gameSound.playZombies(false);
  }

  resume() {
    this.status = "Play";
    this.gameSound.playZombies(true);
  }

  fire() {
    this.gameSound.playShot();
    this.bullets.push(this.character.fire());
  }

  levelUp() {
    this.pause("LevelUp");
    this.gameLevel.nextLevel();
    this.enemies = this.gameLevel.getEnemies(this.clock.getStatus());
  }

  makeMap() {
    this.objects.push(
      new Inanimate({ x: 0, y: 15 }, { h: 400, w: 400 }, "car", 280),
      new Inanimate({ x: 25, y: 30 }, { h: 300, w: 300 }, "camp", 0),
      new Inanimate({ x: 20, y: 36 }, { h: 35, w: 200 }, "fence", 270),
      new Inanimate({ x: 25, y: 27 }, { h: 35, w: 200 }, "fence", 0),
      new Inanimate({ x: 22, y: 50 }, { h: 35, w: 200 }, "fence", 60),
      new Inanimate({ x: 28, y: 57 }, { h: 35, w: 200 }, "fence", 10)
    );
  }

  manageClock() {
    this.clock.update();
    const maxLevel = 5;
    const numberDays = maxLevel - 1;

    for (let index = 0; index < maxLevel; index++) {
      if (this.clock.getDays() === index) {
        this.character.setBattery(index);

        if (
          this.gameLevel.getLevel() === index &&
          this.clock.getDays() !== (0 || numberDays)
        ) {
          console.log(this.clock);
          this.levelUp();
        }
        if (this.allDead && this.gameLevel.getLevel() === maxLevel) {
          this.pause("Win");
        } else if (this.allDead) {
          this.gameSound.playZombies(true);
          this.enemies = this.gameLevel.getEnemies(this.clock.getStatus());
        }
      }
    }
  }

  update() {
    let bulletsAlives: GameObject[] = [];
    this.updateCallback();

    if (this.status === "Play") {
      this.character.moveCharacter();
      //this.manageClock();

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
        //need to find a better way to do it
        /* 
        TODO 
        */
        bulletsAlives.forEach((bullet) => {
          if (enemy.checkCollision(bullet)) {
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
          // enemy.move(this.character.getPosition());
        }
      });
      if (this.character.out) {
        this.gameSound.playZombies(false);
        this.status = "Over";
      } else {
        this.allDead = this.enemies.every((e) => e.out === true);

        const numberDead = this.enemies.filter((enemy) => enemy.out).length;

        if (numberDead > 20) {
          this.enemies = this.enemies.filter(function (obj) {
            return obj.out !== true;
          });
          //remove an enemy who is out  of the screen to make the game more fluid and not too heavy for the browser to handle
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

  getClock() {
    return this.clock;
  }

  setClock(clock: GameClock) {
    this.clock = clock;
  }

  getObjects() {
    return this.objects;
  }
}

export const gameEngine = new GameEngine();
