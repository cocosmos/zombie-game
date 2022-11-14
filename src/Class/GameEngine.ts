import {
  checkCollision,
  currentTime,
  getRandomArbitrary,
  moveCharact,
} from "../utils/helper";
import { gameEvent, GameEventDom } from "./GameEventDom";
import { AnimateCallback, GameLoop } from "./GameLoop";
import { Bullet } from "./Object/Bullet";
import { Character } from "./Object/Character";
import { Enemy } from "./Object/Enemy";
import { Keys, Status } from "../types/CommunType";
import GunSound from "../assets/sound/gunshot.mp3";
import ZombieGroup from "../assets/sound/zombie/zs2.mp3";
import { getRandomFloat } from "../utils/random";

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
  allDead: boolean = false;
  zombies = new Audio(ZombieGroup);
  dayStatus: { status: "Day" | "Night"; time: number } = {
    status: "Day",
    time: 0,
  };

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
    this.zombies.play();
    this.zombies.loop = true;
    console.log(currentTime());
  }

  makeEnemies() {
    for (let index = 0; index < /* getRandomArbitrary(0, 20) */ 5; index++) {
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
    const audio = new Audio(GunSound);
    audio.play();
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
      this.zombies.pause();
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
          this.zombies.pause();
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
