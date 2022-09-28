import { Coord } from "../types/CommunType";
import { GameEngine } from "./GameEngine";
export class GameEventDom {
  cursor: Coord = { x: 0, y: 0 };
  angle: number = 0;
  constructor() {}
  init() {}
  destroy() {}
  mouseMove(event: any) {
    this.cursor.x = event.clientX;
    this.cursor.y = event.clientY;

    const deltaX = window.innerWidth / 2 - this.cursor.x;
    const deltaY = window.innerHeight / 2 - this.cursor.y;

    const radians = Math.atan2(deltaY, deltaX);

    this.angle = Math.round(radians * (180 / Math.PI));
    if (this.angle < 0) {
      this.angle = (this.angle + 360) % 360;
    }
  }
}
