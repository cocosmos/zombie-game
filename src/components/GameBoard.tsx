import { gameEngine } from "../Class/GameEngine";
import GameOver from "./GameStatus";
import Bullet from "./Bullet";
import EnemyDom from "./Enemy/index";
import CharacterDom from "./Character";
import { gameEvent } from "../Class/GameEventDom";

const GameBoard = () => {
  return (
    <>
      <div className="gameBoard" onClick={() => gameEvent.onClick()}>
        {gameEngine.getEnemies().map((enemy) => {
          return <EnemyDom key={enemy.id} item={enemy}></EnemyDom>;
        })}
        <CharacterDom item={gameEngine.getCharacter()} />
        {gameEngine.getBullets().map((bullet) => {
          return <Bullet key={bullet.id} item={bullet}></Bullet>;
        })}
      </div>

      <GameOver status={gameEngine.getStatus()} />
    </>
  );
};

export default GameBoard;
