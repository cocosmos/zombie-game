import { Coord, Size } from "../../types/CommunType";
import { move } from "../../utils/helper";
import { gameEvent } from "../GameEventDom";
import { GameObject } from "./GameObject";

export class Bullet extends GameObject {
  constructor(position: Coord, degree: number, speed: number) {
    super();
    this.position = position;
    this.speed = speed;
    this.degree = degree;
    this.size = { w: 5, h: 5 };
  }
  //function to go increment until the trajectory is done
  update(): void {
    this.position = move(this.position, this.degree, this.speed);
    if (
      this.position.x > gameEvent.gameSize.w ||
      this.position.y > gameEvent.gameSize.h ||
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
