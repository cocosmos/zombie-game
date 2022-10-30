import { gameEngine } from "../../Class/GameEngine";

const Character = () => {
  let whatDo = "idle";
  if (gameEngine.character.shoot) {
    whatDo = "shoot";
  } else if (gameEngine.character.out) {
    whatDo = "dead";
  } else {
    whatDo = "idle";
  }

  return (
    <div
      className="gameObject"
      style={{
        transform: `rotate(${
          !gameEngine.character.out ? gameEngine.domEvent.angle + 90 : 0
        }deg) `,
        left: gameEngine.character.position.x,
        top: gameEngine.character.position.y,
      }}
    >
      <div className={"player" + " " + "player__" + whatDo}></div>
    </div>
  );
};

export default Character;
