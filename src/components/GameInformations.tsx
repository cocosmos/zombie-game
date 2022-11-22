import { FunctionComponent } from "react";
import { gameEngine } from "../Class/GameEngine";
import { Size } from "../types/CommunType";
import man from "../assets/character/man.png";
import Profile from "./Character/Profile";
import { gameEvent } from "../Class/GameEventDom";

type GameInformationsProps = {
  frame: number;
};

const GameInformations: FunctionComponent<GameInformationsProps> = ({
  frame,
}) => {
  return (
    <div className="gameInformations">
      <Profile />
      <span>frame: {frame}</span>

      <span>y:{gameEvent.cursor.y}</span>
      <span>x:{gameEvent.cursor.x}</span>
      <span>angle: {gameEvent.angle}</span>
      <span>clicked: {gameEvent.clicked}</span>
      <div className="gameInformations__level">
        {gameEngine.gameLevel.getLevel()}
      </div>
    </div>
  );
};

export default GameInformations;
