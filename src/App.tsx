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
import GameInformations from "./components/GameInformations";
import "./css/styles.scss";

function App() {
  /*Frame and gameEngine*/
  const [frame, setframe] = useState(0);
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
    }
    window.addEventListener("resize", updateSize);

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
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
