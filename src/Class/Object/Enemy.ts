import { Coord } from "../../types/CommunType";
import { GameObject } from "./GameObject";

export class Enemy extends GameObject {
  constructor(position: Coord, speed: number) {
    super();
    this.position = position;
    this.speed = speed;
  }

  update(): void {
    this.position.x = this.position.x + this.speed;
    this.position.y = this.position.y + this.speed;
  }
}
