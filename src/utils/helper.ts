import { Coord, Keys, Size } from "../types/CommunType";
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
  firstObject: { position: Coord; size: Size; out: boolean },
  secondObject: { position: Coord; size: Size; out: boolean }
) => {
  if (
    firstObject.position.x < secondObject.position.x + secondObject.size.w &&
    firstObject.position.x + firstObject.size.w >
      secondObject.position.x - secondObject.size.h &&
    firstObject.position.y < secondObject.position.y + secondObject.size.h &&
    firstObject.position.y + firstObject.size.h >
      secondObject.position.y - secondObject.size.h &&
    !firstObject.out &&
    !secondObject.out
  ) {
    return true;
  }
  return false;
};

export const calculateAngle = (depart: Coord, finish: Coord) => {
  let angle = Math.atan2(depart.y - finish.y, depart.x - finish.x);

  return radianToDegree(angle);
};

export const radianToDegree = (radian: number) => {
  return (radian * 180) / Math.PI;
};
export const degreeToRadian = (degree: number) => {
  return (degree / 180) * Math.PI;
};
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const moveCharact = (keys: Keys, position: Coord) => {
  const speed = 5;
  let newPosition: Coord = position;

  if (keys.w) {
    newPosition.y -= speed;
  }
  if (keys.s) {
    newPosition.y += speed;
  }
  if (keys.a) {
    newPosition.x -= speed;
  }
  if (keys.d) {
    newPosition.x += speed;
  }
  return newPosition;
};
