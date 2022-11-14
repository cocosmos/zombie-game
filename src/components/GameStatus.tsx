import { gameEngine } from "../Class/GameEngine";
import { FunctionComponent } from "react";
import { Status } from "../types/CommunType";
import zombie from "../assets/zombie.png";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdArrowDropright,
  IoMdArrowDropleft,
} from "react-icons/io";
import { BsFillMouse2Fill } from "react-icons/bs";
import Profile from "./Character/Profile";
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
          <Profile />
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
        <div className="game__status__principal__zombie">
          <img src={zombie} alt="character" />
        </div>
      </div>

      <div className="game__status__informations">
        {status === "Start" ? (
          <>
            <p>
              Press <span className="key">ENTER</span> to play
            </p>
            <p>
              Direction and fire with{" "}
              <span className="key">
                <BsFillMouse2Fill />{" "}
              </span>{" "}
              or Press <span className="key">SPACE</span> to Fire
            </p>

            <div className="move">
              <div className="keys">
                <span className="key">w</span>
                <span className="key">A</span>
                <span className="key">S</span>
                <span className="key">D</span>
              </div>
              <p>Move with</p>
              <div className="keys">
                <span className="key">{<IoMdArrowDropup />}</span>
                <span className="key">{<IoMdArrowDropleft />}</span>

                <span className="key">{<IoMdArrowDropdown />}</span>
                <span className="key">{<IoMdArrowDropright />}</span>
              </div>
            </div>
          </>
        ) : (
          <p>Try again if you dare...</p>
        )}
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
