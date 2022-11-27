import { Coord, Keys } from "../../types/CommunType";
import { checkOutOfScreen } from "../../utils/helper";
import { gameEvent } from "../GameEventDom";
import { Bullet } from "./Bullet";
import { GameObject } from "./GameObject";

export class Character extends GameObject {
  shoot: boolean;
  kills: number;
  keys: Keys = { w: false, a: false, s: false, d: false };
  battery: number;

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
    this.battery = 100;
  }

  moveCharacter(): void {
    const { top, bottom, left, right } = checkOutOfScreen(
      this.position,
      gameEvent.gameSize,
      this.size
    );
    if (this.keys.w && !top) {
      this.position.y -= this.speed;
    }
    if (this.keys.s && !bottom) {
      this.position.y += this.speed;
    }
    if (this.keys.a && !left) {
      this.position.x -= this.speed;
    }
    if (this.keys.d && !right) {
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

  addKill(): void {
    this.kills++;
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
    this.kills = kills;
  }
  getKeys(): Keys {
    return this.keys;
  }
  setKeys(keys: Keys): void {
    this.keys = keys;
  }
  getBattery(): number {
    return this.battery;
  }
  setBattery(battery: number): void {
    switch (battery) {
      case 0:
        this.battery = 100;
        break;
      case 1:
        this.battery = 75;
        break;
      case 2:
        this.battery = 50;
        break;
      case 3:
        this.battery = 25;
        break;
      case 4:
        this.battery = 0;
        break;
      default:
        this.battery = battery;
    }
  }
}
