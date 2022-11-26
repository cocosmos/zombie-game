import { Coord, Size, TypeObject } from "../../types/CommunType";
import { GameObject } from "./GameObject";

export class Inanimate extends GameObject {
  shouldBlock: boolean;
  type: TypeObject;

  constructor(position: Coord, size: Size, type: TypeObject, degree: number) {
    super();
    this.position = position;
    this.size = size;
    this.shouldBlock = false;
    this.type = type;
    this.degree = degree;
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
