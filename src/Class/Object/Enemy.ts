import { Coord } from "../../types/CommunType";
import { move } from "../../utils/helper";
import { Bullet } from "./Bullet";
import { GameObject } from "./GameObject";

export class Enemy extends GameObject {
  constructor(position: Coord, speed: number, degree: number) {
    super();
    this.position = position;
    this.speed = speed;
    this.degree = degree;
  }

  update(): void {
    this.position = move(this.position, this.degree, this.speed);

    if (
      this.position.x > 550 ||
      this.position.y > 550 ||
      this.position.x < -5 ||
      this.position.y < -5
    ) {
      this.out = true;
    } else {
      this.out = false;
    }
  }
}
