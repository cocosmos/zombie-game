import { FunctionComponent } from "react";
import { gameEngine } from "../Class/GameEngine";

type GameInformationsProps = {
  frame: number;
};

const GameInformations: FunctionComponent<GameInformationsProps> = ({
  frame,
}) => {
  const w = window.innerWidth / 2;
  const h = window.innerHeight / 2;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <span>frame: {frame}</span>
      <span>
        w: {w} h: {h}
      </span>
      <span>y:{gameEngine.domEvent.cursor.y}</span>
      <span>x:{gameEngine.domEvent.cursor.x}</span>
      <span>angle: {gameEngine.domEvent.angle}</span>
      <span>clicked: {gameEngine.domEvent.clicked}</span>
      <button type="reset" onClick={() => {}}>
        reset
      </button>
    </div>
  );
};

export default GameInformations;
