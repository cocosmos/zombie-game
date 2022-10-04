import { gameEngine } from "../Class/GameEngine";
import DomGameObject from "./DomGameObject";
import Enemy from "./Enemy";
import GameOver from "./GameOver";

const GameBoard = () => {
  const OverOrStart = gameEngine.over();

  return OverOrStart ? (
    <div>
      {gameEngine.enemies.map((enemy) => {
        return <Enemy key={enemy.id} item={enemy}></Enemy>;
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
          width: "50px",
          height: "50px",
          backgroundColor: "green",
          borderRadius: "50px",
          transform: `rotate(${gameEngine.domEvent.angle}deg)`,
        }}
      >
        <div
          style={{
            width: "50px",
            height: "10px",
            backgroundColor: "green",
            position: "absolute",
            top: 20,
            right: 30,
          }}
        ></div>
      </div>
      {gameEngine.bullets.map((bullet) => {
        return <DomGameObject key={bullet.id} item={bullet}></DomGameObject>;
      })}
      {/*  <div
        key={bullet.trajectory.x}
        style={{
          position: "absolute",
          width: 10,
          height: 5,
          backgroundColor: "white",
          top: bullet.y,
          left: bullet.x,
          zIndex: 99,
        }}
      ></div> */}
    </div>
  ) : (
    <GameOver />
  );
};

export default GameBoard;
