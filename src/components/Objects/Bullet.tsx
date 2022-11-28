import { DomGameObjectProps } from "../../types/CommunType";
import b from "../../assets/sprite/shot/shot.webp";

const Bullet = ({ item }: DomGameObjectProps) => {
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

export default Bullet;
