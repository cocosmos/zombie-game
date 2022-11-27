import { Enemy } from "../../Class/Object/Enemy";

type EnemyProps = {
  item: Enemy;
};

const EnemyDom = ({ item }: EnemyProps) => {
  const level = "l" + item.getLevel();
  const isDead = !item.getOut() ? level + "walk" : level + "dead";
  const type =
    "level" + item.getLevel() + "z" + item.getDesign().type + "__" + isDead;

  const animation = item.getOut()
    ? undefined
    : {
        animationDuration: `${item.getDesign().animation}s`,
      };

  return (
    <div
      className="gameObject "
      style={{
        top: item.getPosition().y,
        left: item.getPosition().x,
        zIndex: item.getOut() ? 0 : 1,
      }}
    >
      <div
        className={`zombie ${isDead + " " + type}`}
        style={{
          transform: `rotate(${item.getDegree() + 90}deg)`,
          ...animation,
        }}
      ></div>
    </div>
  );
};

export default EnemyDom;
