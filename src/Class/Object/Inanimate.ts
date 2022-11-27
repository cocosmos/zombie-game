import { Coord, Size, TypeObject } from "../../types/CommunType";
import { degreeToRadian } from "../../utils/helper";
import { gameEvent } from "../GameEventDom";
import { GameObject } from "./GameObject";

export class Inanimate extends GameObject {
  shouldBlock: boolean;
  type: TypeObject;

  constructor(position: Coord, size: Size, type: TypeObject, degree: number) {
    super();
    this.postitionFromPercentToPixel(position);
    // this.position = position;
    this.size = size;
    this.shouldBlock = false;
    this.type = type;
    this.degree = degree;
    this.radius = degreeToRadian(this.degree);
  }

  postitionFromPercentToPixel(position: Coord): void {
    this.position.x = (position.x * gameEvent.getGameSize().w) / 100;
    this.position.y = (position.y * gameEvent.getGameSize().h) / 100;
  }

  getType(): TypeObject {
    return this.type;
  }

  getShouldBlock(): boolean {
    return this.shouldBlock;
  }

  setShouldBlock(shouldBlock: boolean): void {
    this.shouldBlock = shouldBlock;
  }

  setType(type: TypeObject): void {
    this.type = type;
  }
}
