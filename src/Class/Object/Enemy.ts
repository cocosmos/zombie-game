import { Coord } from "../../types/CommunType";
import { GameObject } from "./GameObject";

export class Enemy extends GameObject {
  constructor(position: Coord) {
    super();
    this.position = position;
  }

  update(): void {
    this.position.x = this.position.x + 0.1;
  }
}
