import { gameEngine } from "../Class/GameEngine";
import { FunctionComponent } from "react";
import { Status } from "../types/CommunType";

type GameOverProps = {
  status: Status;
};

const GameOver: FunctionComponent<GameOverProps> = ({ status }) => {
  const information = informations.find((info) => info.status === status);
  if (status === "Play") return null;
  return (
    <div className="game__status">
      <h1>{information?.title}</h1>
      <button
        onClick={() => {
          gameEngine.domEvent.init();
          gameEngine.appDom.focus();
        }}
      >
        {information?.button}
      </button>
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

export default GameOver;
