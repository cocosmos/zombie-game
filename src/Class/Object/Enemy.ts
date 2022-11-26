import { Coord, Type } from "../../types/CommunType";
import { calculateAngle, degreeToRadian } from "../../utils/helper";
import { getRandomArbitrary, getRandomFloat } from "../../utils/random";
import { gameEvent } from "../GameEventDom";
import { GameObject } from "./GameObject";
export class Enemy extends GameObject {
  health: number = 1;
  damage: number = 1;
  level: number = 1;
  design: { type: number; animation: number };
  constructor(level: number) {
    super();
    this.position = this.setPosition();
    this.speed = level; // same speed as level
    this.degree = 0;
    this.size = { w: 100, h: 100 };
    this.level = level;
    this.design = { type: 1, animation: 1 };
    this.changeDesign();
  }

  changeDesign(): void {
    switch (this.level) {
      case 1:
        this.design = {
          type: getRandomFloat(1, 4, 0),
          animation: getRandomFloat(1, 1.6, 1),
        };
        break;
      case 5:
        this.design = {
          type: 1,
          animation: getRandomFloat(1, 3, 1),
        };
        break;
      default:
        this.design = {
          type: getRandomFloat(1, 2, 0),
          animation: getRandomFloat(1, 2.5, 1),
        };
        break;
    }
  }

  move(object: Coord) {
    this.degree = calculateAngle(this.position, object);
    const radian = degreeToRadian(this.degree);
    this.position.x = this.position.x - this.speed * Math.cos(radian);
    this.position.y = this.position.y - this.speed * Math.sin(radian);
  }
  //random position
  setPosition(): Coord {
    const outXY = 100;
    const outXYSmall = -5;
    const height = gameEvent.gameSize.h;
    const width = gameEvent.gameSize.w;
    // ex : -100, nh + 100
    const randomHeightGameSize = getRandomArbitrary(-outXY, height + outXY);
    // ex : -100, nw + 100
    const randomWidthGameSize = getRandomArbitrary(-outXY, width + outXY);
    // ex : -100, -5
    const randomSizeSmall = getRandomArbitrary(-outXY, outXYSmall);
    // ex : nh, nh + 100
    const randomHeightPlus = getRandomArbitrary(height, height + outXY);
    // ex : nw, nw + 100
    const randomWidthPlus = getRandomArbitrary(width, width + outXY);
    let x = 0;
    let y = 0;

    switch (getRandomFloat(0, 3, 0)) {
      case 0:
        x = randomWidthGameSize;
        y = randomSizeSmall;
        break;
      case 1:
        x = randomWidthGameSize;
        y = randomHeightPlus;

        break;
      case 2:
        x = randomSizeSmall;
        y = randomHeightGameSize;
        break;
      case 3:
        x = randomWidthPlus;
        y = randomHeightGameSize;
        break;
    }

    return { x: x, y: y };
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  getHealth(): number {
    return this.health;
  }

  setHealth(health: number): void {
    this.health = health;
  }

  getDamage(): number {
    return this.damage;
  }

  setDamage(damage: number): void {
    this.damage = damage;
  }

  getLevel(): number {
    return this.level;
  }

  setLevel(level: number): void {
    this.level = level;
  }

  getDesign(): { type: number; animation: number } {
    return this.design;
  }

  setDesign(design: { type: number; animation: number }): void {
    this.design = design;
  }
}
