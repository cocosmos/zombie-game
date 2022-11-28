import { FunctionComponent } from "react";
import Profile from "./Informations/Profile";
import Level from "./Informations/Level";
import Clock from "./Informations/Clock";
import Icon from "./Informations/Icon";

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
