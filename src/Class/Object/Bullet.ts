import { Coord } from "../../types/CommunType";
import { checkOutOfScreen, degreeToRadian, move } from "../../utils/helper";
import { gameEvent } from "../GameEventDom";
import { GameObject } from "./GameObject";

export class Bullet extends GameObject {
  radian: number = 0;
  constructor(position: Coord, degree: number) {
    super();
    this.speed = 30;
    this.degree = degree;
    this.radian = degreeToRadian(degree);
    this.size = { w: 5, h: 5 };
    this.position = position;
  }

  //function to go increment until the trajectory is done
  update() {
    this.out = checkOutOfScreen(this.position, gameEvent.gameSize);

    this.position = move(this.position, this.radian, this.speed);
  }
}
