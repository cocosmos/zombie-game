import {
  GiBullets,
  GiClockwork,
  GiDeadHead,
  GiTargetShot,
} from "react-icons/gi";
import { gameEngine } from "../../Class/GameEngine";
const Stats = () => {
  const kills = gameEngine.character.getKills();
  const days = gameEngine.getClock().getDays();
  const bullets = gameEngine.character.getBulletsShooted();
  const precision = Math.round((kills / bullets) * 100);
  const precisionText = isNaN(precision) ? "0" : precision;
  const stats = [
    { title: "Kills:", value: kills, icon: <GiDeadHead /> },
    { title: "Shots:", value: bullets, icon: <GiBullets /> },
    {
      title: "Precision:",
      value: precisionText + "/100",
      icon: <GiTargetShot />,
    },

    { title: "Days:", value: days, icon: <GiClockwork /> },
  ];
  return (
    <div className="stats">
      <div className="stats__title">
        <h2>Stats</h2>
      </div>
      <ul>
        {stats.map((stat) => (
          <li className="stats__content" key={stat.title}>
            <span className="stats__content__title">{stat.title}</span>
            <div className="stats__content__value">
              <span>{stat.value}</span>
              <span className="stats__content__value-icon">{stat.icon}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
