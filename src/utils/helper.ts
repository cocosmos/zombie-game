import { Coord, Keys, Size } from "../types/CommunType";
/**
 * Move an object
 * @param base
 * @param angle
 * @param velocity
 * @returns
 */
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
/**
 * Check the collision between two objects
 * @param firstObject
 * @param secondObject
 * @returns
 */

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
/**
 * Calculate the angle between two points
 * @param depart
 * @param finish
 * @returns
 */
export const calculateAngle = (depart: Coord, finish: Coord) => {
  let angle = Math.atan2(depart.y - finish.y, depart.x - finish.x);

  return radianToDegree(angle);
};
/**
 * Convert radian to degree
 * @param radian
 * @returns
 */
export const radianToDegree = (radian: number) => {
  return (radian * 180) / Math.PI;
};
/**
 * Convert degree to radian
 * @param degree
 * @returns
 */
export const degreeToRadian = (degree: number) => {
  return (degree / 180) * Math.PI;
};

/**
 * Move the player
 * @param keys
 * @param position
 * @returns
 */
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

/**
 * TODO
 * @returns
 */
export function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh > 12) {
    session = "PM";
  }

  hh = hh < 10 ? 0 + hh : hh;
  mm = mm < 10 ? 0 + mm : mm;
  ss = ss < 10 ? 0 + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  var t = setTimeout(function () {
    currentTime();
  }, 1000);
  return time;
}

currentTime();
