import { gameEvent } from "../GameEventDom";
import { GameObject } from "./GameObject";
import { gameEngine } from "../GameEngine";

export class Character extends GameObject {
  shoot: boolean;
  constructor() {
    super();
    this.position = {
      x: gameEvent.gameSize.w / 2,
      y: gameEvent.gameSize.h / 2,
    };
    this.size = { w: 40, h: 40 };
    this.shoot = false;
  }
  update(): void {
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
