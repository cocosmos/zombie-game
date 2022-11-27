import { nanoid } from "nanoid";
import { Coord, Size } from "../../types/CommunType";

export class GameObject {
  id = nanoid();
  position: Coord = { x: 0, y: 0 };
  degree: number = 0;
  out: boolean = false;
  size: Size = { w: 50, h: 50 };
  speed: number = 0;
  radius: number = 0;
  points: Coord[] = [];
  stopped: boolean = false;

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

  setDirection(direction: Coord): void {
    this.position.x += direction.x;
    this.position.y += direction.y;
  }

  getDirection(): Coord {
    return {
      x: this.position.x,
      y: this.position.y,
    };
  }

  destroy(array: GameObject[]) {
    array.shift();
  }
  dead() {
    this.out = true;
  }

  stop() {}

  //Getters and setters

  getPosition(): Coord {
    return this.position;
  }

  setPosition(position: Coord): void {
    this.position = position;
  }

  getDegree(): number {
    return this.degree;
  }

  setDegree(degree: number): void {
    this.degree = degree;
  }

  getSize(): Size {
    return this.size;
  }

  setSize(size: Size): void {
    this.size = size;
  }

  getSpeed(): number {
    return this.speed;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  getOut(): boolean {
    return this.out;
  }

  setOut(out: boolean): void {
    this.out = out;
  }

  getRadius(): number {
    return this.radius;
  }

  setRadius(radius: number): void {
    this.radius = radius;
  }

  getPoints(): Coord[] {
    return this.points;
  }

  setPoints(points: Coord[]): void {
    this.points = points;
  }

  getStopped(): boolean {
    return this.stopped;
  }

  setStopped(stopped: boolean): void {
    this.stopped = stopped;
  }
}
