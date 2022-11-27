import ZombieGroup from "../assets/sound/zombie/zs2.mp3";
import GunSound from "../assets/sound/effect/gunshot.mp3";
import Ambiant from "../assets/sound/music/ambiant.mp3";
import Day from "../assets/sound/ambiant/day.mp3";
import Night from "../assets/sound/ambiant/night.mp3";
import Night2 from "../assets/sound/ambiant/night2.mp3";
import DeadMan from "../assets/sound/man/deadman2.mp3";
import ZombieDeath from "../assets/sound/zombie/zombie-death.mp3";
import LevelUp from "../assets/sound/effect/levelup.mp3";
import Scary from "../assets/sound/music/scary.mp3";
import Scary2 from "../assets/sound/music/scary2.mp3";
import Applause from "../assets/sound/effect/applause.mp3";
import Steps from "../assets/sound/ambiant/steps.mp3";
import Laugh from "../assets/sound/effect/laugh.mp3";

import { Sound } from "./Object/Sound";

export class GameSound {
  sounds: Sound[] = [];
  muted: boolean = false;

  constructor() {
    this.sounds = [
      new Sound("ambiant", Ambiant, 1, true, false),
      new Sound("day", Day, 0.7, true, false),
      new Sound("night", Night, 1, true, false),
      new Sound("night2", Night2, 1, true, false),
      new Sound("scary", Scary, 1, true, false),
      new Sound("scary2", Scary2, 1, true, false),
      new Sound("zombies", ZombieGroup, 1, true, false),
      new Sound("levelUp", LevelUp, 1, false, false),
      new Sound("deadMan", DeadMan, 1, false, false),
      new Sound("applause", Applause, 1, false, false),
      new Sound("forest", Steps, 0.3, true, false),
      new Sound("laugh", Laugh, 1, false, false),
    ];
  }
  //To avoid sound not playing at the correct time
  playGunShot() {
    new Sound("gunShot", GunSound, 1, false, this.muted).play();
  }

  playZombieDeath() {
    new Sound("deadZombie", ZombieDeath, 1, false, this.muted).play();
  }

  playSound(name: string) {
    const sound = this.sounds.find((sound) => sound.name === name);
    if (sound) {
      sound.play();
    }
  }

  stopSound(name: string) {
    const sound = this.sounds.find((sound) => sound.name === name);
    if (sound) {
      sound.stop();
    }
  }

  stopAllSound() {
    this.sounds.forEach((sound) => {
      sound.stop();
    });
  }
}
