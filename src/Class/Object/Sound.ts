export class Sound {
  name: string;
  audio: HTMLAudioElement;
  volume: number;
  loop: boolean;
  muted: boolean;
  constructor(
    name: string,
    src: string,
    volume: number,
    loop: boolean,
    muted: boolean
  ) {
    this.name = name;
    this.audio = new Audio(src);
    this.volume = muted ? 0 : volume;
    this.loop = loop;
    this.muted = muted;
  }

  play() {
    this.audio.currentTime = 0;
    this.audio.play();

    if (this.loop) {
      this.audio.loop = true;
    }
    this.audio.volume = this.volume;
  }

  stop() {
    this.audio.pause();
  }

  setVolume(volume: number) {
    this.volume = volume;
  }

  setLoop(loop: boolean) {
    this.loop = loop;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.audio.volume = muted ? 0 : this.volume;
  }
}
