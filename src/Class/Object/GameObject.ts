import { nanoid } from "nanoid";
import { Coord, Keys, Size } from "../../types/CommunType";

export class GameObject {
  position: Coord = { x: 0, y: 0 };
  velocity: number = 0;
  trajectory: Coord = { x: 0, y: 0 };
  degree: number = 0;
  out: boolean = false;
  size: Size = { w: 0, h: 0 };
  keys: Keys = { w: false, a: false, s: false, d: false };
  type?: { level: number; number: number };
  speed: number = 0;
  id = nanoid();

  constructor() {}

  checkCollision(object: GameObject) {
    if (
      this.position.x < object.position.x + object.size.w &&
      this.position.x + this.size.w > object.position.x - object.size.h &&
      this.position.y < object.position.y + object.size.h &&
      this.position.y + this.size.h > object.position.y - object.size.h &&
      !this.out &&
      !object.out
    ) {
      this.out = true;
      return true;
    }
    return false;
  }

  destroy(array: GameObject[]) {
    array.shift();
  }
  dead() {
    this.out = true;
  }

  stop() {}
}
