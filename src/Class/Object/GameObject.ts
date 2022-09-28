import { nanoid } from "nanoid";
import { Coord } from "../../types/CommunType";

export class GameObject {
  position: Coord = { x: 0, y: 0 };
  velocity: Coord = { x: 0, y: 0 };
  id = nanoid();
  constructor() {}
  update() {}
}
