import man from "../../assets/profile/man.png";
import { GiDeadHead } from "react-icons/gi";
import { gameEngine } from "../../Class/GameEngine";

const Profile = () => {
  const numberKills = gameEngine.character.getKills();
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
