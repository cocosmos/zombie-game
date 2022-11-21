import { Character } from "../../Class/Object/Character";
import { DomGameObjectProps } from "../../types/CommunType";

type CharacterProps = {
  item: Character;
};

const CharacterDom = ({ item }: CharacterProps) => {
  let whatDo = "idle";
  if (item.shoot) {
    whatDo = "shoot";
  } else if (item.out) {
    whatDo = "dead";
  } else {
    whatDo = "idle";
  }

  return (
    <div
      className="gameObject"
      style={{
        transform: `rotate(${!item.out ? item.degree + 90 : 0}deg) `,
        left: item.position.x,
        top: item.position.y,
      }}
    >
      <div className={"player" + " " + "player__" + whatDo}></div>
    </div>
  );
};

export default CharacterDom;
