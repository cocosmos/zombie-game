import { GiMedalSkull } from "react-icons/gi";
import { gameEngine } from "../../Class/GameEngine";

const Level = () => {
  return (
    <div className="level">
      <p className="level__text">Level: {gameEngine.gameLevel.getLevel()}</p>
      <span className="level__icon">
        <GiMedalSkull color="white" />
      </span>
    </div>
  );
};

export default Level;
