import { Coord } from "../types/CommunType";
import { move } from "../utils/helper";
import { GameEngine, gameEngine } from "./GameEngine";
import { Bullet } from "./Object/Bullet";
import { Enemy } from "./Object/Enemy";
export class GameEventDom {
  cursor: Coord = { x: 0, y: 0 };
  angle: number = 0;
  clicked: number = 0;
  delta: Coord = { x: 0, y: 0 };
  center = { w: window.innerWidth / 2, h: window.innerHeight / 2 };

  constructor() {}
  init() {}
  destroy() {}
  mouseMove(event: any) {
    this.cursor.x = event.clientX;
    this.cursor.y = event.clientY;
    this.center.w = 500 / 2;
    this.center.h = 500 / 2;
    this.delta.x = this.center.w - this.cursor.x;
    this.delta.y = this.center.h - this.cursor.y;

    const radians = Math.atan2(this.delta.y, this.delta.x);

    this.angle = Math.round(radians * (180 / Math.PI));
    if (this.angle < 0) {
      this.angle = (this.angle + 360) % 360;
    }
  }

  onClick() {
    this.clicked = this.clicked + 1;
    gameEngine.fire(
      new Bullet({ x: this.center.w, y: this.center.h }, this.angle, 10)
    );
  }
  onKeyDown(event: any) {
    console.log(event.key);
  }
}
