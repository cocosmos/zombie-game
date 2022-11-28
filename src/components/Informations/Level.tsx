import { gameEngine } from "../../Class/GameEngine";
import Icon from "./Icon";

const Level = () => {
  return (
    <div className="level">
      <p className="level__text">
        Level: {gameEngine.getGameLevel().getLevel()}
      </p>
      <span className="level__icon">
        <Icon name="MedalSkull" color="white" size={35} />
      </span>
    </div>
  );
};

export default Level;
