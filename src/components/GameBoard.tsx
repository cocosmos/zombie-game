import { gameEngine } from "../Class/GameEngine";
import Character from "./Character";
import DomGameObject from "./DomGameObject";
import Enemy from "./Enemy";
import GameOver from "./GameOver";

const GameBoard = () => {
  const OverOrStart = gameEngine.over();

  return OverOrStart ? (
    <div className="gameBoard">
      {gameEngine.enemies.map((enemy) => {
        return <Enemy key={enemy.id} item={enemy}></Enemy>;
      })}
      <Character />
      {gameEngine.bullets.map((bullet) => {
        return <DomGameObject key={bullet.id} item={bullet}></DomGameObject>;
      })}
    </div>
  ) : (
    <GameOver />
  );
};

export default GameBoard;
