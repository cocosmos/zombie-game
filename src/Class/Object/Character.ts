import { Keys } from "../../types/CommunType";
import { gameEvent } from "../GameEventDom";
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
  update(): void {
    if (
      this.position.x > gameEvent.gameSize.w ||
      this.position.y > gameEvent.gameSize.h ||
      this.position.x < -5 ||
      this.position.y < -5
    ) {
      this.out = true;
    } else {
      this.out = false;
    }
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
}
