import { Coord, Size } from "../types/CommunType";
import { move } from "../utils/helper";
import { GameEngine, gameEngine } from "./GameEngine";
import { Bullet } from "./Object/Bullet";
import { Enemy } from "./Object/Enemy";
export class GameEventDom {
  cursor: Coord = { x: 0, y: 0 };
  angle: number = 0;
  clicked: number = 0;
  delta: Coord = { x: 0, y: 0 };
  gameSize: Size = { w: 0, h: 0 };

  constructor() {
    this.gameSize = { w: window.innerWidth, h: window.innerHeight };
  }
  init() {}
  destroy() {}
  mouseMove(event: any) {
    this.cursor.x = event.clientX;
    this.cursor.y = event.clientY;

    this.delta.x = this.gameSize.w / 2 - this.cursor.x;
    this.delta.y = this.gameSize.h / 2 - this.cursor.y;

    const radians = Math.atan2(this.delta.y, this.delta.x);

    this.angle = Math.round(radians * (180 / Math.PI));
    if (this.angle < 0) {
      this.angle = (this.angle + 360) % 360;
    }
  }

  onClick() {
    this.clicked = this.clicked + 1;
    gameEngine.fire(
      new Bullet(
        { x: this.gameSize.w / 2, y: this.gameSize.h / 2 },
        this.angle,
        10
      )
    );
  }
  onKeyDown(event: any) {
    console.log(event.key);
  }
}
export const gameEvent = new GameEventDom();
