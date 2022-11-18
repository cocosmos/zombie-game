import { gameEngine } from "../Class/GameEngine";
import Character from "./Character";
import Enemy from "./Enemy";
import GameOver from "./GameStatus";
import Bullet from "./Bullet";
import EnemyDom from "./Enemy/index";

const GameBoard = () => {
  return (
    <>
      <div className="gameBoard">
        {gameEngine.enemies.map((enemy) => {
          return <EnemyDom key={enemy.id} item={enemy}></EnemyDom>;
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
