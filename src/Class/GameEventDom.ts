import { Coord, Keys, Size } from "../types/CommunType";
import { gameEngine } from "./GameEngine";
export class GameEventDom {
  cursor: Coord = { x: 0, y: 0 };
  angle: number = 0;
  clicked: number = 0;
  delta: Coord = { x: 0, y: 0 };
  gameSize: Size = { w: 0, h: 0 };
  keys: Keys = {
    w: false,
    s: false,
    a: false,
    d: false,
  };
  constructor() {
    this.gameSize = { w: window.innerWidth, h: window.innerHeight };
  }
  init() {
    gameEngine.play();
  }

  onRezise(event: Size) {
    this.gameSize = event;
  }

  mouseMove(event: any) {
    this.cursor.x = event.clientX;
    this.cursor.y = event.clientY;

    this.delta.x = gameEngine.character.getPosition().x - this.cursor.x;
    this.delta.y = gameEngine.character.getPosition().y - this.cursor.y;

    const radians = Math.atan2(this.delta.y, this.delta.x);

    this.angle = Math.round(radians * (180 / Math.PI));

    if (this.angle < 0) {
      this.angle = (this.angle + 360) % 360;
    }
    gameEngine.character.setDegree(this.angle);
  }

  onClick() {
    if (gameEngine.getStatus() === "Play") {
      this.clicked++;
      gameEngine.fire();
    }
  }

  onKeyDown(event: any) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
        this.keys.w = true;
        break;
      case "ArrowDown":
      case "s":
        this.keys.s = true;
        break;
      case "ArrowLeft":
      case "a":
        this.keys.a = true;
        break;
      case "ArrowRight":
      case "d":
        this.keys.d = true;
        break;

      case "Enter":
        if (gameEngine.getStatus() !== "Play") {
          this.init();
        }
        break;

      default:
        break;
    }
    gameEngine.character.setKeys(this.keys);
  }
  onKeyUp(event: any) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
        this.keys.w = false;
        break;
      case "ArrowDown":
      case "s":
        this.keys.s = false;
        break;
      case "ArrowLeft":
      case "a":
        this.keys.a = false;
        break;
      case "ArrowRight":
      case "d":
        this.keys.d = false;
        break;

      case " ":
        this.onClick();
        break;

      default:
        break;
    }
    gameEngine.character.setKeys(this.keys);
  }

  getCursor(): Coord {
    return this.cursor;
  }

  getAngle(): number {
    return this.angle;
  }

  getClicked(): number {
    return this.clicked;
  }

  getGameSize(): Size {
    return this.gameSize;
  }

  getKeys(): Keys {
    return this.keys;
  }

  getDelta(): Coord {
    return this.delta;
  }

  setCursor(cursor: Coord) {
    this.cursor = cursor;
  }

  setAngle(angle: number) {
    this.angle = angle;
  }

  setClicked(clicked: number) {
    this.clicked = clicked;
  }

  setGameSize(gameSize: Size) {
    this.gameSize = gameSize;
  }

  setKeys(keys: Keys) {
    this.keys = keys;
  }

  setDelta(delta: Coord) {
    this.delta = delta;
  }
}
export const gameEvent = new GameEventDom();
