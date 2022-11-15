import ZombieGroup from "../assets/sound/zombie/zs2.mp3";
import GunSound from "../assets/sound/gunshot.mp3";
export class GameSound {
  constructor() {}

  playZombies(isPlaying: boolean) {
    const audio = new Audio(ZombieGroup);
    if (isPlaying) {
      audio.play();
      audio.loop = true;
    } else {
      audio.pause();
    }
  }
  playShot() {
    const audio = new Audio(GunSound);
    audio.play();
  }

  playMenu() {
    console.log("playMenu");
  }
}
