import { Coord, Size } from "../../types/CommunType";
import { calculateAngle, move } from "../../utils/helper";
import { gameEngine } from "../GameEngine";
import { gameEvent } from "../GameEventDom";
import { Bullet } from "./Bullet";
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
