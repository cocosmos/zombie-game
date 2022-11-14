import man from "../../assets/character/man.png";
import { GiDeadHead } from "react-icons/gi";
import { DomGameObjectProps } from "../../types/CommunType";
import { gameEngine } from "../../Class/GameEngine";
const Profile = () => {
  const numberKills = gameEngine.character.kills;
  return (
    <div className="character__info">
      <img src={man} alt="character" />
      <div className="character__info__kills">
        <GiDeadHead />
        <span>{numberKills}</span>
      </div>
    </div>
  );
};

export default Profile;
