import { nanoid } from "nanoid";
import { Coord, Keys, Size } from "../../types/CommunType";

export class GameObject {
  position: Coord = { x: 0, y: 0 };
  velocity: Coord = { x: 0, y: 0 };
  trajectory: Coord = { x: 0, y: 0 };
  degree: number = 0;
  out: boolean = false;
  size: Size = { w: 0, h: 0 };
  keys: Keys = { w: false, a: false, s: false, d: false };
  type?: { level: number; number: number };
  speed: number = 0;
  id = nanoid();
  constructor() {}
  update() {}
  stop() {}
}
