import { DomGameObjectProps } from "../../types/CommunType";

const Wall = ({ item }: DomGameObjectProps) => {
  return (
    <div className="wall">
      <div className="wall__top"></div>
      <div className="wall__bottom"></div>
      <div className="wall__left"></div>
      <div className="wall__right"></div>
    </div>
  );
};

export default Wall;
