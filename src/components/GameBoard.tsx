import { gameEngine } from "../Class/GameEngine";

const GameBoard = () => {
  return (
    <div>
      {" "}
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
      {/*  <div
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
      ></div> */}
    </div>
  );
};

export default GameBoard;
