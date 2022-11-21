import { Coord, Keys } from "../../types/CommunType";
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

  moveCharacter(keys: Keys) {
    this.keys = keys;
    if (keys.w) {
      this.position.y -= this.speed;
    }
    if (keys.s) {
      this.position.y += this.speed;
    }
    if (keys.a) {
      this.position.x -= this.speed;
    }
    if (keys.d) {
      this.position.x += this.speed;
    }
  }
  resetKills() {
    this.kills = 0;
  }

  fire() {
    console.log("fire");
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
  setKills(kills: number): void {
    this.kills = +kills;
  }
  getKeys(): Keys {
    return this.keys;
  }
  setKeys(keys: Keys): void {
    this.keys = keys;
  }
}
