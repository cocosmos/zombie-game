import { nanoid } from "nanoid";
import { Coord } from "../../types/CommunType";

export class GameObject {
  position: Coord = { x: 0, y: 0 };
  velocity: Coord = { x: 0, y: 0 };
  trajectory: Coord = { x: 0, y: 0 };
  degree: number = 0;
  out: boolean = false;

  speed: number = 0;
  id = nanoid();
  constructor() {}
  update() {}
  stop() {}
}
