export type AnimateCallback = (delta?: number) => any;

export class GameLoop {
  requestID: number;
  constructor(private animateCallback: AnimateCallback, private fpsLimit = 60) {
    this.requestID = 0;
  }

  start() {
    let then = performance.now();
    const interval = 1000 / this.fpsLimit;
    // Add tolerance because RAF could call the callback a little bit earlier
    const tolerance = 0.1;

    const animateLoop = (now: number) => {
      this.requestID = requestAnimationFrame(animateLoop);
      const delta = now - then;
      // Check if elapsed time between frame is enough
      // To avoid run more that expected frames rate
      if (delta >= interval - tolerance) {
        then = now - (delta % interval);
        this.animateCallback(delta);
      }
    };
    this.requestID = requestAnimationFrame(animateLoop);
  }

  stop() {
    cancelAnimationFrame(this.requestID);
  }
}
