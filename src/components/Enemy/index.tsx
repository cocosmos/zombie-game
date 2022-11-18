import { Enemy } from "../../Class/Object/Enemy";

type EnemyProps = {
  item: Enemy;
};

const EnemyDom = ({ item }: EnemyProps) => {
  const level = "l" + item.level;
  const isDead = !item.out ? level + "walk" : level + "dead";
  const type = "level" + item.level + "z" + 1 + "__" + isDead;
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

export default EnemyDom;
