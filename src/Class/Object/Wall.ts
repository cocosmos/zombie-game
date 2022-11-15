import { Coord } from "../../types/CommunType";
import { GameObject } from "./GameObject";

export class Wall extends GameObject {
  constructor(position: Coord) {
    super();
    this.position = position;
    this.size = { w: 50, h: 50 };
  }
}
