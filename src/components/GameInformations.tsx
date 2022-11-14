import { FunctionComponent } from "react";
import { gameEngine } from "../Class/GameEngine";
import { Size } from "../types/CommunType";
import man from "../assets/character/man.png";
import Profile from "./Character/Profile";

type GameInformationsProps = {
  frame: number;
};

const GameInformations: FunctionComponent<GameInformationsProps> = ({
  frame,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 2,
      }}
    >
      <Profile />
      <span>frame: {frame}</span>

      <span>y:{gameEngine.domEvent.cursor.y}</span>
      <span>x:{gameEngine.domEvent.cursor.x}</span>
      <span>angle: {gameEngine.domEvent.angle}</span>
      <span>clicked: {gameEngine.domEvent.clicked}</span>
    </div>
  );
};

export default GameInformations;
