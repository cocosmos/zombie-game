import { numberEnemy } from "../types/CommunType";
import { Enemy } from "./Object/Enemy";
export class GameLevel {
  level: number;
  enemies: Enemy[];
  status: "Play" | "Win" | "Over";
  constructor(level: number) {
    this.level = level;
    this.enemies = [];
    this.status = "Play";
  }
  makeLevel() {
    switch (this.level) {
      case 1:
        this.setEnemies([{ amount: 5, levelZombie: 1 }]);
        break;
      case 2:
        this.setEnemies([
          { amount: 10, levelZombie: 1 },
          { amount: 3, levelZombie: 2 },
        ]);
        break;
      case 3:
        this.setEnemies([{ amount: 3, levelZombie: 1 }]);
        break;
      case 4:
        this.setEnemies([{ amount: 4, levelZombie: 1 }]);
        break;
      case 5:
        this.setEnemies([{ amount: 5, levelZombie: 1 }]);
        break;
      default:
        this.setEnemies([{ amount: 5, levelZombie: 1 }]);
        break;
    }
  }

  cleanEnemies() {
    this.enemies = [];
  }

  setEnemies(enemiesToMake: numberEnemy[]) {
    enemiesToMake.forEach((element) => {
      for (let i = 0; i < element.amount; i++) {
        this.enemies.push(new Enemy(element.levelZombie));
      }
    });
  }

  nextLevel() {
    this.level++;
    this.cleanEnemies();
    this.makeLevel();
  }

  getEnemies() {
    this.makeLevel(); //make the enemies for the level
    return this.enemies;
  }

  getLevel() {
    return this.level;
  }

  setLevel(level: number) {
    this.level = level;
  }

  getStatus() {
    return this.status;
  }
  setStatus(status: "Play" | "Win" | "Over") {
    this.status = status;
  }
}
