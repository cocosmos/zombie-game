import { GameObject } from "../Class/Object/GameObject";
import b from "../assets/sprite/shot/shot.png";
export type DomGameObjectProps = {
  item: GameObject;
};

const DomGameObject = ({ item }: DomGameObjectProps) => {
  return (
    <div
      className="gameObject"
      style={{
        top: item.position.y,
        left: item.position.x,
        transform: `rotate(${item.degree + 90}deg)`,
      }}
    >
      <img
        className="bullet"
        draggable="false"
        src={b}
        width={"10px"}
        height={"10px"}
      />
    </div>
  );
};

export default DomGameObject;
