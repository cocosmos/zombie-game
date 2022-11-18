import { Coord, Keys } from "../../types/CommunType";
import { gameEvent } from "../GameEventDom";
import { Bullet } from "./Bullet";
import { GameObject } from "./GameObject";

export class Character extends GameObject {
  shoot: boolean;
  kills: number;
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

  getPosition(): Coord {
    return this.position;
  }

  setPosition(position: Coord): void {
    this.position = position;
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
  increaseKills() {
    this.kills++;
  }
  resetKills() {
    this.kills = 0;
  }
  isShooting(shoot: boolean) {
    this.shoot = shoot;
  }
  fire() {
    console.log("fire");
    return new Bullet(this.position, this.degree);
  }
}
