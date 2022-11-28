import { gameEngine } from "../Class/GameEngine";
import { FunctionComponent } from "react";
import { Status } from "../types/CommunType";
import zombie from "../assets/zombie.webp";
import army from "../assets/interface/army.webp";

import { gameEvent } from "../Class/GameEventDom";
import arrow from "../assets/interface/arrowgreen.webp";
import Level from "./Informations/Level";
import Stats from "./Informations/Stats";
import Icon from "./Informations/Icon";
type GameStatusProps = {
  status: Status;
  days: number;
};

const GameStatus: FunctionComponent<GameStatusProps> = ({ status, days }) => {
  const informations = [
    {
      status: "Start",
      title: "Start the game",
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
      text: `Well done you have survived ${
        days + " " + (days <= 1 ? "day" : "days")
      } but how many more before you died?`,
    },
  ];
  const information = informations.find((info) => info.status === status);

  const isLevelUp = status === "LevelUp";
  const isStart = status === "Start";

  if (status === "Play") return null;
  return (
    <div className={`game__status `}>
      <div className="game__status__title">
        <h1>Survive one more day !</h1>
      </div>
      <div className="game__status__principal">
        <div className="game__status__principal__soldier">
          {isStart ? <img src={army} alt="soldier" width={300} /> : <Stats />}
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
          <img src={zombie} alt="zombie" />
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
                <Icon name="Mouse" size={30} />{" "}
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
                <span className="key">{<Icon name="ArrowUp" size={25} />}</span>
                <span className="key">
                  {<Icon name="ArrowLeft" size={25} />}
                </span>

                <span className="key">
                  <Icon name="ArrowDown" size={25} />
                </span>
                <span className="key">
                  <Icon name="ArrowRight" size={25} />
                </span>
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

export default GameStatus;
