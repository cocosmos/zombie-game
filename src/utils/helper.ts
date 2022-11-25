import { GameObject } from "../Class/Object/GameObject";
import { Coord, Keys, Size, Clock, ClockStatus } from "../types/CommunType";

/**
 * Calculate the angle between two points
 * @param depart
 * @param finish
 * @returns angle
 */
export const calculateAngle = (depart: Coord, finish: Coord) => {
  let angle = Math.atan2(depart.y - finish.y, depart.x - finish.x);

  return radianToDegree(angle);
};
/**
 * Convert radian to degree
 * @param radian
 * @returns degree
 */
export const radianToDegree = (radian: number) => {
  return (radian * 180) / Math.PI;
};
/**
 * Convert degree to radian
 * @param degree
 * @returns radian
 */
export const degreeToRadian = (degree: number) => {
  return (degree * Math.PI) / 180;
};

/**
 * Move an object
 * @param base
 * @param angle
 * @param velocity
 * @returns coordFinish
 */
export const move = (
  base: { x: number; y: number },
  angle: number,
  speed: number
) => {
  let coordFinish: Coord = { x: 0, y: 0 };

  //const radian = degreeToRadian(angle);

  coordFinish.x = base.x - speed * Math.cos(angle);
  coordFinish.y = base.y - speed * Math.sin(angle);
  return coordFinish;
};

export const checkOutOfScreen = (
  position: Coord,
  gameSize: Size,
  size: Size
) => {
  let out = {
    top: false,
    bottom: false,
    left: false,
    right: false,
    isOut: false,
  };
  if (position.y < 0 + size.h) {
    out.top = true;
    out.isOut = true;
  }
  if (position.y > gameSize.h - size.h) {
    out.bottom = true;
    out.isOut = true;
  }
  if (position.x < 0 + size.w) {
    out.left = true;
    out.isOut = true;
  }
  if (position.x > gameSize.w - size.w) {
    out.right = true;
    out.isOut = true;
  }
  return out;
};
