import { DomGameObjectProps } from "../../types/CommunType";

const Enemy = ({ item }: DomGameObjectProps) => {
  const level = "l" + item.type?.level;
  const isDead = !item.out ? level + "walk" : level + "dead";
  const type =
    "level" + item.type?.level + "z" + item.type?.number + "__" + isDead;
  return (
    <div
      className="gameObject "
      style={{
        top: item.position.y,
        left: item.position.x,
        transform: `rotate(${item.degree + 90}deg)`,
        zIndex: item.out ? 0 : 1,
      }}
    >
      <div className={`zombie ${isDead + " " + type}`}></div>
    </div>
  );
};

export default Enemy;
