import { Coord } from "../../../types/CommunType";
import { Enemy } from "../Enemy";

export class ZombieLevel1 extends Enemy {
  constructor(position: Coord) {
    super(position);
    this.position = position;
    this.health = 1;
    this.speed = 1;
    this.damage = 1;
    this.size = { w: 50, h: 50 };
  }
}
