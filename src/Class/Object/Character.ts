import { Keys } from "../../types/CommunType";
import { checkOutOfScreen } from "../../utils/helper";
import { gameEvent } from "../GameEventDom";
import { Bullet } from "./Bullet";
import { GameObject } from "./GameObject";

export class Character extends GameObject {
  shoot: boolean;
  kills: number;
  keys: Keys = { w: false, a: false, s: false, d: false };

  constructor() {
    super();
    this.position = {
      x: gameEvent.gameSize.w / 2,
      y: gameEvent.gameSize.h / 2,
    };
    this.size = { w: 40, h: 40 };
    this.shoot = false;
    this.kills = 0;
    this.speed = 5;
  }

  update = () => {
    this.out = checkOutOfScreen(this.position, gameEvent.gameSize);
  };

  moveCharacter() {
    if (this.keys.w) {
      this.position.y -= this.speed;
    }
    if (this.keys.s) {
      this.position.y += this.speed;
    }
    if (this.keys.a) {
      this.position.x -= this.speed;
    }
    if (this.keys.d) {
      this.position.x += this.speed;
    }
  }
  resetKills() {
    this.kills = 0;
  }

  fire() {
    this.shoot = true;
    return new Bullet(this.position, this.degree);
  }

  //Getters and setters

  getShoot(): boolean {
    return this.shoot;
  }
  setShoot(shoot: boolean): void {
    this.shoot = shoot;
  }
  getKills(): number {
    return this.kills;
  }
  setKills(): void {
    this.kills++;
  }
  getKeys(): Keys {
    return this.keys;
  }
  setKeys(keys: Keys): void {
    this.keys = keys;
  }
}
