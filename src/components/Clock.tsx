import {
  GiBattery0,
  GiBattery100,
  GiBattery25,
  GiBattery50,
  GiBattery75,
  GiNightSleep,
  GiSun,
} from "react-icons/gi";
import { gameEngine } from "../Class/GameEngine";
const Clock = () => {
  const time = gameEngine.getClock();
  const battery = gameEngine.character.getBattery();

  const days = time.getDays();

  const Battery = () => {
    switch (battery) {
      case 100:
        return <GiBattery100 color="green" />;
      case 75:
        return <GiBattery75 color="green" />;
      case 50:
        return <GiBattery50 color="green" />;
      case 25:
        return <GiBattery25 color="red" />;
      case 0:
        return <GiBattery0 color="red" />;
      default:
        return <GiBattery100 color="green" />;
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
            {time.status === "Day" ? <GiSun /> : <GiNightSleep />}
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
