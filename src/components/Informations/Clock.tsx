import { gameEngine } from "../../Class/GameEngine";
import Icon from "./Icon";

const Clock = () => {
  const time = gameEngine.getClock();
  const battery = gameEngine.character.getBattery();

  const days = time.getDays();

  const Battery = () => {
    switch (battery) {
      case 100:
        return <Icon name="Battery100" color="green" size={25} />;
      case 75:
        return <Icon name="Battery75" color="green" size={25} />;
      case 50:
        return <Icon name="Battery50" color="green" size={25} />;
      case 25:
        return <Icon name="Battery25" color="red" size={25} />;
      case 0:
        return <Icon name="Battery0" color="red" size={50} />;
      default:
        return <Icon name="Battery100" color="green" size={25} />;
    }
  };

  return (
    <div className="clock">
      {battery === 0 ? (
        <>
          <div className="clock__battery-dead">
            <span>{Battery()}</span>
          </div>
          <p className="clock__luck">Good luck...</p>
        </>
      ) : (
        <>
          <div className="clock__battery">{Battery()}</div>
          <div className="clock__icon">
            {time.status === "Day" ? (
              <Icon name="Sun" color="#ffd10e" size={50} />
            ) : (
              <Icon name="NightSleep" color="#9bddff" size={50} />
            )}
          </div>
          <div className="clock__text">
            <p>{time.getTimeStr()}</p>
          </div>
          <span className="clock__days">
            {days} {days <= 1 ? "Day" : "Days"} survived
          </span>
        </>
      )}{" "}
    </div>
  );
};

export default Clock;
