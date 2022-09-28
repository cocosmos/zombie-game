import { useCallback, useEffect, useRef, useState } from "react";
import { gameEngine } from "./Class/GameEngine";
import DomGameObject from "./components/DomGameObject";
import "./css/App.css";

interface bulletType {
  x: number;
  y: number;
  trajectory: { x: number; y: number };
  speed: number;
}

function App() {
  const appDom = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [clicked, setClicked] = useState(0);
  const w = window.innerWidth / 2;
  const h = window.innerHeight / 2;
  // const [bullets, setBullets] = useState<bulletType[]>([]);
  const [bullet, setBullet] = useState({
    x: w,
    y: h,
    trajectory: { x: 0, y: 469 },
    speed: 100,
  });
  /**
   * Player
   */
  const deltaX = w - x;
  const deltaY = h - y;

  const radians = Math.atan2(deltaY, deltaX);

  let angle = Math.round(radians * (180 / Math.PI));
  if (angle < 0) {
    angle = (angle + 360) % 360;
  }
  const mouseHandler = (event: any) => {
    event.preventDefault();

    setX(event.clientX);
    setY(event.clientY);
  };

  /* 
  const clickHandler = () => {
    setClicked(clicked + 1);

    setBullets([
      ...bullets,
      {
        x: w,
        y: h,
        trajectory: { x: 0, y: 469 },
        speed: 100,
      },
    ]);

    shoot();
  }; */

  /**
   * Bullet
   */
  const clickHandler = () => {
    setClicked(clicked + 1);

    setBullet({
      x: w,
      y: h,
      trajectory: { x: 0, y: 469 },
      speed: 100,
    });

    shoot();
  };
  const shoot = () => {
    for (let i = bullet.x; i > bullet.trajectory.x; i--) {
      setBulletTrajectory(i);
      console.log(i);
    }
  };

  const setBulletTrajectory = (i: number) => {
    setTimeout(function () {
      setBullet({
        x: i,
        y: bullet.y,
        trajectory: { x: bullet.trajectory.x, y: bullet.trajectory.y },
        speed: bullet.speed,
      });
    }, bullet.speed);
  };

  const [frame, setframe] = useState(0);

  const unUpdate = useCallback(() => {
    setframe((frame) => frame + 1);
    console.log("hdh");
  }, [setframe]);

  useEffect(() => {
    if (appDom.current) {
      gameEngine.init(unUpdate, appDom.current);
      console.log("test");
    }
  }, [appDom]);

  useEffect(() => {
    return () => {
      gameEngine.destroy();
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <span>
          w: {w} h: {h}
        </span>
        <span>y:{gameEngine.domEvent.cursor.y}</span>
        <span>x:{gameEngine.domEvent.cursor.x}</span>
        <span>angle: {gameEngine.domEvent.angle}</span>
        <span>clicked: {clicked}</span>
        <button
          type="reset"
          onClick={() => {
            /* setBullet({
              x: 957,
              y: 469,
              trajectory: { x: 0, y: 469 },
              speed: 100,
            }); */
          }}
        >
          reset
        </button>
      </div>
      <div
        className="App"
        onMouseMove={(event) => gameEngine.domEvent.mouseMove(event)}
        onClick={() => clickHandler()}
        ref={appDom}
      >
        {frame}
        <div
          className="player"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
            width: "50px",
            height: "50px",
            backgroundColor: "red",
            borderRadius: "50px",
            transform: `rotate(${gameEngine.domEvent.angle}deg)`,
          }}
        >
          <div
            className="gun"
            id="gun"
            style={{
              width: "50px",
              height: "10px",
              backgroundColor: " green",
              position: "absolute",
              top: 20,
              right: 30,
            }}
          ></div>
        </div>
        <div
          key={bullet.trajectory.x}
          style={{
            position: "absolute",
            width: 10,
            height: 5,
            backgroundColor: "white",
            top: bullet.y,
            left: bullet.x,
            zIndex: 99,
          }}
        ></div>
        <div
          id="some-element-you-want-to-animate"
          style={{ width: "50px", height: "10px", backgroundColor: " green" }}
        ></div>

        {gameEngine.enemies.map((enemy) => {
          return <DomGameObject item={enemy}></DomGameObject>;
        })}

        {/*  {bullets.map((bullet) => {
          return (
            <div
              key={bullet.trajectory.x}
              style={{
                position: "absolute",
                width: 10,
                height: 5,
                backgroundColor: "white",
                top: bullet.y,
                left: bullet.x,
                zIndex: 99,
              }}
            ></div>
          );
        })} */}
      </div>
    </>
  );
}

export default App;
