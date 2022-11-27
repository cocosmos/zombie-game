import { Coord, Size, TypeObject } from "../../types/CommunType";
import { degreeToRadian } from "../../utils/helper";
import { getRandomFloat } from "../../utils/random";
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
    this.manageDesign();
  }

  manageDesign(): void {
    if (this.type === "tree") {
      this.design.type = getRandomFloat(1, 3, 0);
      this.design.animation = 0;
    } else if (this.type === "bush") {
      this.design.type = getRandomFloat(1, 2, 0);
      this.design.animation = 0;
    }
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
