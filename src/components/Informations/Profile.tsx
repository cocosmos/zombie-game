import man from "../../assets/profile/man.webp";
import { gameEngine } from "../../Class/GameEngine";
import Icon from "./Icon";

const Profile = () => {
  const numberKills = gameEngine.character.getKills();
  return (
    <div className="character__info">
      <img src={man} alt="character" />
      <div className="character__info__kills">
        <Icon name="DeadHead" size={35} />
        <span>{numberKills}</span>
      </div>
    </div>
  );
};

export default Profile;
