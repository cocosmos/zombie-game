import { gameEvent } from "../GameEventDom";
import { GameObject } from "./GameObject";

export class Character extends GameObject {
  constructor() {
    super();
    this.position = {
      x: gameEvent.gameSize.w / 2,
      y: gameEvent.gameSize.h / 2,
    };
    this.size = { w: 50, h: 50 };
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
