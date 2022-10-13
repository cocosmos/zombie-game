import { gameEngine } from "../Class/GameEngine";

const GameOver = () => {
  return (
    <div className="game">
      <h1>Survive one more night</h1>
      <button onClick={() => gameEngine.over(true)}>Play</button>
    </div>
  );
};

export default GameOver;
