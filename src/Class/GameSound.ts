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
import { Sound } from "./Object/Sound";

export class GameSound {
  sounds: Sound[] = [];
  muted: boolean = false;

  constructor() {
    this.sounds = [
      new Sound("ambiant", Ambiant, 0.5, true, false),
      new Sound("day", Day, 0.5, true, false),
      new Sound("night", Night, 0.5, true, false),
      new Sound("night2", Night2, 0.5, true, false),
      new Sound("scary", Scary, 0.5, true, false),
      new Sound("scary2", Scary2, 0.5, true, false),
      new Sound("zombies", ZombieGroup, 1, true, false),
      new Sound("levelUp", LevelUp, 1, false, false),
      new Sound("deadMan", DeadMan, 1, false, false),
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
      sound.audio.play();
      if (sound.loop) {
        sound.audio.loop = true;
      }
      sound.audio.volume = sound.volume;
    }
  }

  stopSound(name: string) {
    const sound = this.sounds.find((sound) => sound.name === name);
    if (sound) {
      sound.audio.pause();
    }
  }

  stopAllSound() {
    this.sounds.forEach((sound) => {
      sound.audio.pause();
    });
  }

  setVolume(name: string, volume: number) {
    const sound = this.sounds.find((sound) => sound.name === name);
    if (sound) {
      sound.audio.volume = volume;
    }
  }
}
