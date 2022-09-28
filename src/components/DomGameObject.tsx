import { GameObject } from "../Class/Object/GameObject";

export type DomGameObjectProps = {
  item: GameObject;
};

const DomGameObject = ({ item }: DomGameObjectProps) => {
  return (
    <div
      className="gameObject"
      style={{
        position: "absolute",
        top: item.position.y,
        left: item.position.x,
        width: "20px",
        height: "20px",
        background: "pink",
      }}
    ></div>
  );
};

export default DomGameObject;
