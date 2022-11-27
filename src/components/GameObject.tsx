import { Inanimate } from "../Class/Object/Inanimate";

type GameObjectProps = {
  item: Inanimate;
};

const GameObject = ({ item }: GameObjectProps) => {
  return (
    <div
      className={`gameObject ${item.getType() + (item.getDesign().type ?? "")}`}
      style={{
        top: item.getPosition().y + "px",
        left: item.getPosition().x + "px",
        transform: `rotate(${item.getDegree()}deg)`,
        width: item.getSize().w,
        height: item.getSize().h,
      }}
    ></div>
  );
};

export default GameObject;
