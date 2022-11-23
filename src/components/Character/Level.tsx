import { GiMedalSkull } from "react-icons/gi";
import { gameEngine } from "../../Class/GameEngine";

const Level = () => {
  return (
    <div className="level">
      <GiMedalSkull />
      <p className="level__text">Level: {gameEngine.gameLevel.getLevel()}</p>
    </div>
  );
};

export default Level;
