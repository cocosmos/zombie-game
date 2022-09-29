import { useState } from "react";

const utils = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [clicked, setClicked] = useState(0);
  const w = window.innerWidth / 2;
  const h = window.innerHeight / 2;
  // const [bullets, setBullets] = useState<bulletType[]>([]);
  const [bullet, setBullet] = useState({
    x: w,
    y: h,
    trajectory: { x: 0, y: 469 },
    speed: 100,
  });

  /* 
    const clickHandler = () => {
      setClicked(clicked + 1);
  
      setBullets([
        ...bullets,
        {
          x: w,
          y: h,
          trajectory: { x: 0, y: 469 },
          speed: 100,
        },
      ]);
  
      shoot();
    }; */

  /**
   * Bullet
   */
  const clickHandler = () => {
    setClicked(clicked + 1);

    setBullet({
      x: w,
      y: h,
      trajectory: { x: 0, y: 469 },
      speed: 100,
    });

    shoot();
  };
  const shoot = () => {
    for (let i = bullet.x; i > bullet.trajectory.x; i--) {
      setBulletTrajectory(i);
      console.log(i);
    }
  };

  const setBulletTrajectory = (i: number) => {
    setTimeout(function () {
      setBullet({
        x: i,
        y: bullet.y,
        trajectory: { x: bullet.trajectory.x, y: bullet.trajectory.y },
        speed: bullet.speed,
      });
    }, bullet.speed);
  };
  return <div></div>;
};

export default utils;
