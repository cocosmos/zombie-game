import { FunctionComponent } from "react";
import Profile from "./Character/Profile";
import Level from "./Character/Level";
import Clock from "./Clock";

const GameInformations: FunctionComponent = () => {
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
