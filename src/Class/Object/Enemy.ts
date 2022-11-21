import { Coord, Type } from "../../types/CommunType";
import { calculateAngle, degreeToRadian } from "../../utils/helper";
import { GameObject } from "./GameObject";
export class Enemy extends GameObject {
  health: number = 1;
  damage: number = 1;
  level: number = 1;
  constructor(position: Coord) {
    super();
    this.position = position;
    this.speed = 1;
    this.degree = 0;
    this.size = { w: 100, h: 100 };
  }

  move(object: Coord) {
    this.degree = calculateAngle(this.position, object);
    const radian = degreeToRadian(this.degree);
    this.position.x = this.position.x - this.speed * Math.cos(radian);
    this.position.y = this.position.y - this.speed * Math.sin(radian);
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
}
