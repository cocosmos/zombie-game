import { Coord, Type } from "../../types/CommunType";
import { calculateAngle } from "../../utils/helper";
import { GameObject } from "./GameObject";
export class Enemy extends GameObject {
  health: number = 1;
  damage: number = 1;
  constructor(position: Coord) {
    super();
    this.position = position;
    this.speed = 1;
    this.degree = 0;
    this.size = { w: 50, h: 50 };
  }

  calculateAngle(object: Coord) {
    this.degree = calculateAngle(this.position, object);
  }
}
