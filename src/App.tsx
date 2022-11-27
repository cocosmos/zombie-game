import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gameEngine } from "./Class/GameEngine";
import { gameEvent } from "./Class/GameEventDom";
import GameBoard from "./components/GameBoard";
import "./css/styles.scss";

function App() {
  /*Frame and gameEngine*/
  const [frame, setframe] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const appDom = useRef<any>(null);
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

  useEffect(() => {
    function updateSize() {
      gameEvent.onRezise({ w: window.innerWidth, h: window.innerHeight });
      if (window.innerWidth > 900) {
        setShowGame(true);
      } else {
        setShowGame(false);
      }
    }

    window.addEventListener("resize", updateSize);

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="App"
      onMouseMove={(event) => gameEvent.mouseMove(event)}
      onKeyDown={(event) => gameEvent.onKeyDown(event)}
      onKeyUp={(event) => gameEvent.onKeyUp(event)}
      ref={appDom}
      tabIndex={-1}
    >
      {showGame ? (
        <GameBoard />
      ) : (
        <div className="rezize">
          <h1>Resize your window !</h1>
          <h2>Not available for mobile yet...</h2>
        </div>
      )}
    </div>
  );
}

export default App;
