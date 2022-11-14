import { gameEngine } from "../Class/GameEngine";
import Character from "./Character";
import Enemy from "./Enemy";
import GameOver from "./GameStatus";
import Bullet from "./Bullet";

const GameBoard = () => {
  return (
    <>
      <div className="gameBoard">
        {gameEngine.enemies.map((enemy) => {
          return <Enemy key={enemy.id} item={enemy}></Enemy>;
        })}
        <Character />
        {gameEngine.bullets.map((bullet) => {
          return <Bullet key={bullet.id} item={bullet}></Bullet>;
        })}
      </div>

      <GameOver status={gameEngine.status} />
    </>
  );
};

export default GameBoard;
