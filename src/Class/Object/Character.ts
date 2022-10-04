import { gameEvent } from "../GameEventDom";
import { GameObject } from "./GameObject";

export class Character extends GameObject {
  constructor() {
    super();
    this.position = {
      x: gameEvent.gameSize.w / 2,
      y: gameEvent.gameSize.h / 2,
    };
    this.size = { w: 25, h: 25 };
  }
}
