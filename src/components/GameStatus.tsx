import { gameEngine } from "../Class/GameEngine";
import { FunctionComponent } from "react";
import { Status } from "../types/CommunType";
import zombie from "../assets/zombie.webp";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdArrowDropright,
  IoMdArrowDropleft,
} from "react-icons/io";
import { BsFillMouse2Fill } from "react-icons/bs";
import Profile from "./Character/Profile";
import { gameEvent } from "../Class/GameEventDom";
import arrow from "../assets/interface/arrowgreen.png";
import Level from "./Character/Level";
type GameStatusProps = {
  status: Status;
};

const GameStatus: FunctionComponent<GameStatusProps> = ({ status }) => {
  const information = informations.find((info) => info.status === status);

  const isLevelUp = status === "LevelUp";

  if (status === "Play") return null;
  return (
    <div className={`game__status `}>
      <div className="game__status__title">
        <h1>Survive one more day !</h1>
      </div>
      <div className="game__status__principal">
        <div className="game__status__principal__character">
          <Profile />
        </div>
        <div
          className={`game__status__principal__box ${
            isLevelUp || status === "Win" ? "appearLevel" : "bounceIn"
          }`}
        >
          {isLevelUp ? (
            <>
              <div className="game__status__principal__box__levelup">
                <h2>{information?.title}</h2>
                {isLevelUp ? (
                  <img src={arrow} alt="green arrow" className="arrowup" />
                ) : null}
                <Level />
              </div>
              <button
                onClick={() => {
                  gameEngine.resume();
                  gameEngine.appDom.focus();
                }}
              >
                {information?.button}
              </button>
            </>
          ) : (
            <>
              <div className="game__status__principal__box__title">
                <h2>{information?.title}</h2>
              </div>
              <button
                onClick={() => {
                  gameEvent.init();
                  gameEngine.appDom.focus();
                }}
              >
                {information?.button}
              </button>
            </>
          )}
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
          <p>{information?.text}</p>
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
    text: "",
  },
  {
    status: "Over",
    title: "Game Over !",
    button: "Play again",
    text: "Try again if you dare...",
  },
  {
    status: "Win",
    title: "You win !!!",
    button: "Play again",
    text: "Try again if you dare...",
  },
  {
    status: "LevelUp",
    title: "Level Up !",
    button: "Continue",
    text: "Well done you have survived one more day but how many more before you died?",
  },
];

export default GameStatus;
