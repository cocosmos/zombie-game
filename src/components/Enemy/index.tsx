import React, { useState } from "react";
import { GameObject } from "../../Class/Object/GameObject";
import { DomGameObjectProps } from "../DomGameObject";
import zombieImage from "../../assets/sprite/z1/walk_zombie1.png";
import { urlAlphabet } from "nanoid";
import { gameEngine } from "../../Class/GameEngine";
import { useRef } from "react";

const Enemy = ({ item }: DomGameObjectProps) => {
  return (
    <div
      className="gameObject "
      style={{
        top: item.position.y,
        left: item.position.x,
        transform: `rotate(${item.degree + 90}deg)`,
      }}
    >
      <div className={`zombie ${!item.out ? "alive" : "dead"}`}></div>
    </div>
  );
};

export default Enemy;
