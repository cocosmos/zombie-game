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
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "pink",
          borderRadius: "50px",
          width: "10px",
          height: "10px",
        }}
      ></div>
    </div>
  );
};

export default DomGameObject;
