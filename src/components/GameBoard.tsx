import { gameEngine } from "../Class/GameEngine";
import Bullet from "./Bullet";
import Character from "./Character";
import DomGameObject from "./DomGameObject";
import Enemy from "./Enemy";
import GameOver from "./GameOver";

const GameBoard = () => {
  const OverOrStart = gameEngine.over(null);

  return OverOrStart ? (
    <div className="gameBoard">
      <div className="wall"></div>
      <div className="wall"></div>
      <div className="wall"></div>
      {gameEngine.enemies.map((enemy) => {
        return <Enemy key={enemy.id} item={enemy}></Enemy>;
      })}
      <Character />
      {gameEngine.bullets.map((bullet) => {
        return <Bullet key={bullet.id} item={bullet}></Bullet>;
      })}
    </div>
  ) : (
    <GameOver />
  );
};

export default GameBoard;
