import React from "react";
import { gameEngine } from "../../Class/GameEngine";
import DomGameObject from "../DomGameObject";

interface Props {}

const Character = (props: Props) => {
  return (
    <div
      className="gameObject"
      style={{
        transform: `rotate(${gameEngine.domEvent.angle + 90}deg) `,
        left: gameEngine.character.position.x,
        top: gameEngine.character.position.y,
      }}
    >
      <div className="player"></div>
    </div>
  );
};

export default Character;
