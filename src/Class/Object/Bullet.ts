import { Coord } from "../../types/CommunType";
import { GameObject } from "./GameObject";

export class Bullet extends GameObject {
  constructor(position: Coord, velocity: Coord) {
    super();
    this.position = position;
    this.velocity = velocity;
  }
  update(): void {
    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;
  }
}
