import { FunctionComponent } from "react";
import { gameEngine } from "../Class/GameEngine";
import { Size } from "../types/CommunType";
import man from "../assets/character/man.png";

type GameInformationsProps = {
  frame: number;
};

const GameInformations: FunctionComponent<GameInformationsProps> = ({
  frame,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 2,
      }}
    >
      <div className="character__info small">
        <img src={man} alt="character" />
      </div>
      <span>frame: {frame}</span>
      {/*   <span>
        w: {gameEngine.domEvent.Size.w} h: {gameEngine.domEvent.center.h}
      </span> */}
      <span>y:{gameEngine.domEvent.cursor.y}</span>
      <span>x:{gameEngine.domEvent.cursor.x}</span>
      <span>angle: {gameEngine.domEvent.angle}</span>
      <span>clicked: {gameEngine.domEvent.clicked}</span>
      <button
        type="reset"
        onClick={() => {
          gameEngine.play();
          gameEngine.appDom.focus();
        }}
      >
        reset
      </button>
    </div>
  );
};

export default GameInformations;
