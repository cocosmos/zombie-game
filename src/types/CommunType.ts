import { GameObject } from "../Class/Object/GameObject";

export type Coord = {
  x: number;
  y: number;
};
export type Size = {
  w: number;
  h: number;
};
export type Keys = {
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
};

export type Status = "Start" | "Play" | "Win" | "Over" | "LevelUp";

export type Type = { level: number; number: number };
export type DomGameObjectProps = {
  item: GameObject;
};

export type numberEnemy = { amount: number; levelZombie: number };

export type ClockStatus = "Day" | "Night";

export type TypeObject =
  | "car"
  | "camp"
  | "fencew"
  | "tree"
  | "fenceh"
  | "bush"
  | "bed";
