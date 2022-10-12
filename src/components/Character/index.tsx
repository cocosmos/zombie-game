import React from "react";
import { gameEngine } from "../../Class/GameEngine";
import DomGameObject from "../DomGameObject";

interface Props {}

const Character = (props: Props) => {
  return (
    <div
      className="player"
      style={{
        backgroundColor: gameEngine.character.out ? "red" : "green",
        transform: `rotate(${gameEngine.domEvent.angle}deg) `,
        left: gameEngine.character.position.x,
        top: gameEngine.character.position.y,
      }}
    >
      <div
        style={{
          width: "50px",
          height: "10px",
          backgroundColor: gameEngine.character.out ? "red" : "green",
          position: "absolute",
          top: 20,
          right: 30,
        }}
      ></div>
    </div>
  );
};

export default Character;
