import { gameEngine } from "../Class/GameEngine";
import GameStatus from "./GameStatus";
import Bullet from "./Bullet";
import EnemyDom from "./Enemy/index";
import CharacterDom from "./Character";
import { gameEvent } from "../Class/GameEventDom";
import GameInformations from "./GameInformations";

const GameBoard = () => {
  const { status } = gameEngine.getClock();
  return (
    <>
      <GameInformations />
      <div
        className={`gameBoard  ${status === "Night" ? "night" : "day"}`}
        onClick={() => gameEvent.onClick()}
      >
        {gameEngine.getEnemies().map((enemy) => {
          return <EnemyDom key={enemy.id} item={enemy}></EnemyDom>;
        })}
        <CharacterDom item={gameEngine.getCharacter()} />
        {gameEngine.getBullets().map((bullet) => {
          return <Bullet key={bullet.id} item={bullet}></Bullet>;
        })}
      </div>

      <GameStatus status={gameEngine.getStatus()} />
    </>
  );
};

export default GameBoard;
