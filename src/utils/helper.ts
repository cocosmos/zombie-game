import { Coord, Size } from "../types/CommunType";
export const move = (
  base: { x: number; y: number },
  angle: number,
  velocity: number
) => {
  let coordFinish: Coord = { x: 0, y: 0 };

  const radian = (angle * Math.PI) / 180;

  coordFinish.x = base.x - velocity * Math.cos(radian);
  coordFinish.y = base.y - velocity * Math.sin(radian);
  return coordFinish;
};

export const checkCollision = (
  firstObject: { position: Coord; size: Size },
  secondObject: { position: Coord; size: Size }
) => {
  if (
    firstObject.position.x < secondObject.position.x + secondObject.size.w &&
    firstObject.position.x + firstObject.size.w >
      secondObject.position.x - secondObject.size.h &&
    firstObject.position.y < secondObject.position.y + secondObject.size.h &&
    firstObject.position.y + firstObject.size.h >
      secondObject.position.y - secondObject.size.h
  ) {
    return true;
  }
  return false;
};

export const calculateAngle = (depart: Coord, finish: Coord) => {
  let angle = Math.atan2(depart.x - finish.x, depart.y - finish.y);
  return radianToDegree(angle);
};

export const radianToDegree = (degree: number) => {
  return (degree * 180) / Math.PI;
};
