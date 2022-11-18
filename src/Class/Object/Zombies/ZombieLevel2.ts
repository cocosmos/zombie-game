import { Coord } from "../../../types/CommunType";
import { Enemy } from "../Enemy";

export class ZombieLevel2 extends Enemy {
  constructor(position: Coord) {
    super(position);
    this.position = position;
    this.health = 1;
    this.speed = 2;
    this.damage = 1;
    this.level = 2;
    this.size = { w: 50, h: 50 };
  }
}
