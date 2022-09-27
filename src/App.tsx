import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

interface bulletType {
  x: number;
  y: number;
  trajectory: { x: number; y: number };
  speed: number;
}

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [clicked, setClicked] = useState(0);

  const [bullets, setBullets] = useState<bulletType[]>([]);

  const w = window.innerWidth / 2;
  const h = window.innerHeight / 2;

  const deltaX = w - x;
  const deltaY = h - y;

  const radians = Math.atan2(deltaY, deltaX);

  console.log(w, h);

  let angle = Math.round(radians * (180 / Math.PI));
  if (angle < 0) {
    angle = (angle + 360) % 360;
  }
  /*   const shoot = () => {
    for (let i = bullet.x; i > bullet.trajectory.x; i--) {
      setBulletTrajectory(i);
      console.log(i);
    }
  }; */

  console.log(bullets);

  const clickHandler = () => {
    setClicked(clicked + 1);

    setBullets([
      ...bullets,
      {
        x: h,
        y: w,
        trajectory: { x: 0, y: 469 },
        speed: 100,
      },
    ]);

    /*  shoot(); */
  };

  /*   const setBulletTrajectory = (i: number) => {
    setTimeout(function () {
      setBullet({
        x: i,
        y: bullet.y,
        trajectory: { x: bullet.trajectory.x, y: bullet.trajectory.y },
        speed: bullet.speed,
      });
    }, bullet.speed);
  }; */

  const mouseHandler = (event: any) => {
    event.preventDefault();

    setX(event.clientX);
    setY(event.clientY);
  };

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
        <span>y:{y}</span>
        <span>x:{x}</span>
        <span>angle: {angle}</span>
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
        onMouseMove={(event) => mouseHandler(event)}
        onClick={() => clickHandler()}
      >
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
            transform: `rotate(${angle}deg)`,
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
        {bullets.map((bullet) => {
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
        })}
      </div>
    </>
  );
}

export default App;
