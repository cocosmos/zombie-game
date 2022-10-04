import { Coord } from "../../types/CommunType";
import { move } from "../../utils/helper";
import { GameObject } from "./GameObject";

export class Bullet extends GameObject {
  constructor(position: Coord, degree: number, speed: number) {
    super();
    this.position = position;
    this.speed = speed;
    this.degree = degree;
  }
  //function to go increment until the trajectory is done
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
  destroy(bullets: Bullet[]) {
    bullets.shift();
  }
}
