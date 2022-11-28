import { gameEngine } from "../../Class/GameEngine";
import Icon from "./Icon";
const Stats = () => {
  const kills = gameEngine.character.getKills();
  const days = gameEngine.getClock().getDays();
  const bullets = gameEngine.character.getBulletsShooted();
  const precision = Math.round((kills / bullets) * 100);
  const precisionText = isNaN(precision) ? "0" : precision;
  const stats = [
    { title: "Kills:", value: kills, icon: <Icon name="DeadHead" size={40} /> },
    {
      title: "Shots:",
      value: bullets,
      icon: <Icon name="Bullets" size={40} />,
    },
    {
      title: "Precision:",
      value: precisionText,
      precision: "/100",
      icon: <Icon name="TargetShot" size={40} />,
    },

    { title: "Days:", value: days, icon: <Icon name="ClockWork" size={40} /> },
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
              <p>
                <span>{stat.value}</span>
                <span className="stats__content__value-precision">
                  {stat.precision}
                </span>
              </p>
              <span className="stats__content__value-icon">{stat.icon}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
