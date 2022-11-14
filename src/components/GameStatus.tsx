import { gameEngine } from "../Class/GameEngine";
import { FunctionComponent } from "react";
import { Status } from "../types/CommunType";
import man from "../assets/character/man.png";

type GameStatusProps = {
  status: Status;
};

const GameStatus: FunctionComponent<GameStatusProps> = ({ status }) => {
  const information = informations.find((info) => info.status === status);
  if (status === "Play") return null;
  return (
    <div className="game__status">
      <div className="game__status__title">
        <h1>Survive one more day !</h1>
      </div>
      <div className="game__status__principal">
        <div className="game__status__principal__character">
          <div className="character__info">
            <img src={man} alt="character" />
            <p className="character__info__name">Marcus</p>
          </div>
        </div>
        <div className="game__status__principal__box">
          <h2>{information?.title}</h2>
          <button
            onClick={() => {
              gameEngine.domEvent.init();
              gameEngine.appDom.focus();
            }}
          >
            {information?.button}
          </button>
        </div>
        <div className="game__status__principal__zombie">dd</div>
      </div>

      <div className="game__status__informations">
        <p>Press ENTER to play</p>
        <p>Click with mouse or Press Space to Fire</p>
        <p>Move with w, a, s, d or Arrows</p>
        <p>Try to survive ... !</p>
      </div>
    </div>
  );
};

const informations = [
  {
    status: "Start",
    title: "Please Start",
    button: "Play",
  },
  {
    status: "Over",
    title: "Game Over !",
    button: "Play again",
  },
  {
    status: "Win",
    title: "You win !!!",
    button: "Play again",
  },
];

export default GameStatus;
