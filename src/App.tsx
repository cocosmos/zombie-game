import { useCallback, useEffect, useRef, useState } from "react";
import { gameEngine } from "./Class/GameEngine";
import DomGameObject from "./components/DomGameObject";
import GameBoard from "./components/GameBoard";
import GameInformations from "./components/GameInformations";
import "./css/App.css";

function App() {
  const appDom = useRef<any>(null);

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
    if (appDom.current) {
      appDom.current.focus();
    }
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
        onKeyDown={(event) => gameEngine.domEvent.onKeyDown(event)}
        onKeyUp={(event) => gameEngine.domEvent.onKeyUp(event)}
        ref={appDom}
        tabIndex={-1}
      >
        <GameBoard />
      </div>
    </>
  );
}

export default App;
