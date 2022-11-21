import ZombieGroup from "../assets/sound/zombie/zs2.mp3";
import GunSound from "../assets/sound/gunshot.mp3";
export class GameSound {
  zombies: HTMLAudioElement = new Audio(ZombieGroup);
  gunShot: HTMLAudioElement = new Audio(GunSound);
  constructor() {}

  playZombies(isPlaying: boolean) {
    if (isPlaying) {
      this.zombies.play();
      this.zombies.loop = true;
    } else {
      this.zombies.pause();
    }
  }
  playShot() {
    this.gunShot.currentTime = 0;
    this.gunShot.play();
  }

  playMenu() {
    console.log("playMenu");
  }
}
