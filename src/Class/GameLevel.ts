import { ClockStatus, numberEnemy } from "../types/CommunType";
import { Enemy } from "./Object/Enemy";
import { getRandomFloat } from "../utils/random";
export class GameLevel {
  level: number;
  enemies: Enemy[];
  constructor(level: number) {
    this.level = level;
    this.enemies = [];
  }
  makeLevel(dayOrNight: ClockStatus) {
    const enemiesToMake: numberEnemy[] = [];
    let coeficientMultiplier = 1;
    if (dayOrNight === "Night") {
      coeficientMultiplier = 2;
    }

    for (let index = 1; index <= this.level; index++) {
      let amount = 1;

      switch (index) {
        case 1:
          amount = getRandomFloat(5, 6 * coeficientMultiplier, 0);
          break;
        case 2:
          amount = getRandomFloat(1, 3 * coeficientMultiplier, 0);
          break;
        case 3:
          amount = getRandomFloat(1, 4, 0);
          break;
        case 4:
          amount = getRandomFloat(1, 3, 0);
          break;
        case 5:
          amount = 1;
          break;
        default:
          amount = 5;
          break;
      }

      enemiesToMake.push({
        amount: amount,
        levelZombie: index,
      });
    }

    console.log(enemiesToMake);
    this.setEnemies(enemiesToMake);
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
  }

  getEnemies(dayOrNight: ClockStatus) {
    this.makeLevel(dayOrNight); //make the enemies for the level
    return this.enemies;
  }

  getLevel() {
    return this.level;
  }

  setLevel(level: number) {
    this.level = level;
  }
}
