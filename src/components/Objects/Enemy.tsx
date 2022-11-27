import { Enemy } from "../../Class/Object/Enemy";

type EnemyProps = {
  item: Enemy;
};

const EnemyDom = ({ item }: EnemyProps) => {
  const level = "l" + item.level;
  const isDead = !item.out ? level + "walk" : level + "dead";
  const type =
    "level" + item.level + "z" + item.getDesign().type + "__" + isDead;

  return (
    <div
      className="gameObject "
      style={{
        top: item.position.y,
        left: item.position.x,
        zIndex: item.out ? 0 : 1,
      }}
    >
      <div
        className={`zombie ${isDead + " " + type}`}
        style={{
          transform: `rotate(${item.degree + 90}deg)`,
          animationDuration: `${item.getDesign().animation}s`,
        }}
      ></div>
    </div>
  );
};

export default EnemyDom;
