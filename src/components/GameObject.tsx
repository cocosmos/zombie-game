import { Inanimate } from "../Class/Object/Inanimate";

type GameObjectProps = {
  item: Inanimate;
};

const GameObject = ({ item }: GameObjectProps) => {
  return (
    <div
      className={`gameObject ${item.getType()}`}
      style={{
        top: item.getPosition().y + "%",
        left: item.getPosition().x + "%",
        transform: `rotate(${item.getDegree()}deg) `,
        width: item.getSize().w,
        height: item.getSize().h,
      }}
    />
  );
};

export default GameObject;
