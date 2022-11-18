import { Coord, Keys, Size } from "../types/CommunType";

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
