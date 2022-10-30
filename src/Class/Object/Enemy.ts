import { Coord, Type } from "../../types/CommunType";
import { calculateAngle, move } from "../../utils/helper";
import { GameObject } from "./GameObject";
export class Enemy extends GameObject {
  character: Coord;
  type: Type;
  constructor(position: Coord, character: Coord, type: Type) {
    super();
    this.position = position;
    this.character = character;
    this.speed = 1;
    this.degree = 0;
    this.size = { w: 50, h: 50 };
    this.type = type;
  }

  update(): void {
    switch (this.type.level) {
      case 1:
        this.speed = 1;
        break;
      case 2:
        this.speed = 2;
        break;
      case 3:
        this.speed = 3;
        break;
      case 4:
        this.speed = 4;
        break;
      case 5:
        this.speed = 5;
        break;
      default:
        this.speed = 1;
        break;
    }
    this.degree = calculateAngle(this.position, this.character);
    this.position = move(this.position, this.degree, this.speed);
  }
}
