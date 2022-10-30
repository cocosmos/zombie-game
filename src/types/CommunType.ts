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

export type Status = "Start" | "Play" | "Win" | "Over";

export type Type = { level: number; number: number };
