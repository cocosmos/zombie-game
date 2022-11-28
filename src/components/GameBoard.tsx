import { gameEngine } from "../Class/GameEngine";
import GameStatus from "./GameStatus";
import Bullet from "./Objects/Bullet";
import CharacterDom from "./Objects/Character";
import { gameEvent } from "../Class/GameEventDom";
import GameInformations from "./GameInformations";
import EnemyDom from "./Objects/Enemy";
import GameObject from "./Objects/GameObject";

const GameBoard = () => {
  const { status, days } = gameEngine.getClock();
  return (
    <>
      <GameInformations />
      <div
        className={`gameBoard  ${status === "Night" ? "night" : "day"}`}
        onClick={() => gameEvent.onClick()}
      >
        {gameEngine.getObjects().map((item) => {
          return <GameObject key={item.id} item={item} />;
        })}

        {gameEngine.getEnemies().map((enemy) => {
          return <EnemyDom key={enemy.id} item={enemy}></EnemyDom>;
        })}
        <CharacterDom item={gameEngine.getCharacter()} />
        {gameEngine.getBullets().map((bullet) => {
          return <Bullet key={bullet.id} item={bullet}></Bullet>;
        })}
      </div>

      <GameStatus status={gameEngine.getStatus()} days={days} />
    </>
  );
};

export default GameBoard;
