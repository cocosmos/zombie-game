import { FunctionComponent } from "react";
import { gameEngine } from "../Class/GameEngine";
import { Size } from "../types/CommunType";
import man from "../assets/character/man.png";
import Profile from "./Character/Profile";
import { gameEvent } from "../Class/GameEventDom";
import Level from "./Character/Level";
import Clock from "./Clock";

type GameInformationsProps = {
  frame: number;
};

const GameInformations: FunctionComponent<GameInformationsProps> = ({
  frame,
}) => {
  return (
    <>
      <div className="info info-profile">
        <Profile />
      </div>
      <div className="info info-level">
        <Level />
      </div>
      <div className="info info-clock">
        <Clock />
      </div>
    </>
  );
};

export default GameInformations;
