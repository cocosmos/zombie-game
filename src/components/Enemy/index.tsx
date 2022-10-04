import React from "react";
import { GameObject } from "../../Class/Object/GameObject";
import { DomGameObjectProps } from "../DomGameObject";

const Enemy = ({ item }: DomGameObjectProps) => {
  return (
    <div
      className="gameObject"
      style={{
        position: "absolute",
        top: item.position.y,
        left: item.position.x,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: item.out ? "red" : "pink",
          borderRadius: "50px",
          width: "50px",
          height: "50px",
        }}
      ></div>
    </div>
  );
};

export default Enemy;
