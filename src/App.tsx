import { useCallback, useEffect, useRef, useState } from "react";
import { gameEngine } from "./Class/GameEngine";
import DomGameObject from "./components/DomGameObject";
import GameBoard from "./components/GameBoard";
import GameInformations from "./components/GameInformations";
import "./css/App.css";

function App() {
  const appDom = useRef(null);

  /*Frame and gameEngine*/
  const [frame, setframe] = useState(0);

  const unUpdate = useCallback(() => {
    setframe((frame) => frame + 1);
  }, [setframe]);

  useEffect(() => {
    if (appDom.current) {
      gameEngine.init(unUpdate, appDom.current);
    }
  }, [appDom]);

  useEffect(() => {
    return () => {
      gameEngine.destroy();
    };
  }, []);

  return (
    <>
      <GameInformations frame={frame} />
      <div
        className="App"
        onMouseMove={(event) => gameEngine.domEvent.mouseMove(event)}
        onClick={() => gameEngine.domEvent.onClick()}
        ref={appDom}
      >
        <GameBoard />

        {gameEngine.enemies.map((enemy) => {
          return <DomGameObject key={enemy.id} item={enemy}></DomGameObject>;
        })}
      </div>
    </>
  );
}

export default App;
