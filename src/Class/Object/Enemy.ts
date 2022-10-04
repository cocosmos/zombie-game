import { Coord, Size } from "../../types/CommunType";
import { move } from "../../utils/helper";
import { gameEngine } from "../GameEngine";
import { gameEvent } from "../GameEventDom";
import { Bullet } from "./Bullet";
import { GameObject } from "./GameObject";

export class Enemy extends GameObject {
  constructor(position: Coord, speed: number, degree: number) {
    super();
    this.position = position;
    this.speed = speed;
    this.degree = degree;
    this.size = { w: 25, h: 25 };
  }

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
}
