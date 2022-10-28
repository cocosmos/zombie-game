import { Coord } from "../../types/CommunType";
import { calculateAngle, move } from "../../utils/helper";
import { GameObject } from "./GameObject";

export class Enemy extends GameObject {
  character: Coord;
  constructor(position: Coord, speed: number, character: Coord) {
    super();
    this.position = position;
    this.character = character;
    this.speed = speed;
    this.degree = 0;
    this.size = { w: 25, h: 25 };
  }

  update(): void {
    this.degree = calculateAngle(this.position, this.character);
    this.position = move(this.position, this.degree, this.speed);
  }
}
