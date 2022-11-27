import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Status } from "../types/CommunType";

import { GameSound } from "./GameSound";
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
    this.status = "Start";
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
    this.gameSound.playSound("scary2");
  }

  play() {
    this.enemies = [];
    this.status = "Play";
    this.character = new Character();
    this.gameLevel = new GameLevel(1);
    this.clock = new GameClock(28800);
    this.gameSound.stopSound("applause");
    this.gameSound.stopSound("ambiant");
    this.gameSound.stopSound("scary2");
    this.gameSound.playSound("zombies");
    this.gameSound.playSound("forest");
    this.enemies = this.gameLevel.getEnemies(this.clock.getStatus());
  }

  pause(status: Status) {
    this.status = status;
    this.gameSound.stopSound("zombies");
    this.gameSound.stopSound("forest");

    switch (status) {
      case "LevelUp":
        this.gameSound.playSound("levelUp");
        this.gameSound.playSound("ambiant");
        break;
      case "Over":
        this.gameSound.playSound("deadMan");
        setTimeout(() => {
          this.gameSound.playSound("laugh");
        }, 1000);
        this.gameSound.playSound("scary2");
        break;
      case "Win":
        this.gameSound.playSound("applause");
        this.gameSound.playSound("ambiant");

        break;

      default:
        break;
    }
  }

  resume() {
    this.status = "Play";
    this.gameSound.playSound("zombies");
    this.gameSound.playSound("forest");
    //Stop sound
    this.gameSound.stopSound("levelUp");
    this.gameSound.stopSound("scary2");
    this.gameSound.stopSound("applause");
    this.gameSound.stopSound("laugh");
    this.gameSound.stopSound("ambiant");
  }

  fire() {
    this.gameSound.playGunShot();

    this.bullets.push(this.character.fire());
  }

  levelUp() {
    this.pause("LevelUp");
    this.gameLevel.nextLevel();
    this.enemies.push(...this.gameLevel.getEnemies(this.clock.getStatus()));
  }

  makeMap() {
    this.objects.push(
      new Inanimate({ x: 0, y: 10 }, { h: 400, w: 250 }, "car", 0),
      new Inanimate({ x: 25, y: 30 }, { h: 175, w: 300 }, "camp", 0),
      new Inanimate({ x: 23, y: 30 }, { h: 175, w: 300 }, "bed", 290)
    );
  }

  manageClock() {
    this.clock.update();
    const maxLevel = 5;

    for (let index = 0; index < maxLevel; index++) {
      if (this.clock.getDays() === index) {
        this.character.setBattery(index);

        if (
          this.gameLevel.getLevel() === index &&
          this.clock.getDays() !== (0 || maxLevel)
        ) {
          this.levelUp();
        }
      }
    }
  }

  update() {
    this.updateCallback();
    let bulletsAlives: Bullet[] = [];

    if (this.status === "Play") {
      this.manageClock();
      this.character.moveCharacter();

      //Bullets
      this.bullets.forEach((bullet) => {
        bullet.update();
        if (!bullet.getOut()) {
          bulletsAlives.push(bullet);
          this.character.setShoot(true);
        } else {
          this.character.setShoot(false);
        }
      });
      this.enemies.forEach((enemy) => {
        if (enemy.checkCollision(this.character)) {
          this.pause("Over");
          this.character.dead();
        }

        bulletsAlives.forEach((bullet) => {
          if (enemy.checkCollision(bullet)) {
            bullet.destroy(bulletsAlives);
            this.gameSound.playZombieDeath();
            this.character.addKill();
            this.character.setShoot(false);
          }
        });
        if (bulletsAlives.length === 0) {
          this.bullets = [];
          this.character.setShoot(false);
        }
        //Enemy update
        if (!enemy.getOut() && !enemy.getStopped()) {
          enemy.move(this.character.getPosition());
        }
      });
      if (!this.character.out) {
        this.allDead = this.enemies.every((e) => e.out === true);

        const numberDead = this.enemies.filter((enemy) => enemy.out).length;

        if (numberDead > 20) {
          this.enemies = this.enemies.filter(function (obj) {
            return obj.out !== true;
          });
          //remove an enemy who is out  of the screen to make the game more fluid and not too heavy for the browser to handle
        }
        if (this.allDead) {
          const maxLevel = 5;
          if (this.gameLevel.getLevel() === maxLevel) {
            this.pause("Win");
          } else {
            this.gameSound.stopSound("zombies");
            this.gameLevel.cleanEnemies();
            this.enemies.push(
              ...this.gameLevel.getEnemies(this.clock.getStatus())
            );
            this.gameSound.playSound("zombies");
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

  getClock() {
    return this.clock;
  }

  setClock(clock: GameClock) {
    this.clock = clock;
  }

  getObjects() {
    return this.objects;
  }

  getGameLevel() {
    return this.gameLevel;
  }

  getGameSound() {
    return this.gameSound;
  }
}

export const gameEngine = new GameEngine();
