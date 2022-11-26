import { ClockStatus } from "../types/CommunType";

export class GameClock {
  status: ClockStatus;
  timeStr: string;
  hours: number;
  minutes: number;
  days: number;
  time: number;
  speed: number;
  hourDay: { day: number; night: number };
  constructor(time: number) {
    this.status = "Day";
    this.timeStr = "08h00";
    this.hours = 0;
    this.minutes = 0;
    this.days = 0;
    this.time = time;
    this.speed = 200;
    this.hourDay = { day: 8, night: 20 };
  }
  update() {
    this.time += this.speed;
    //24h = 86400s
    const oneday = 86400;
    const onemorning = 28800 + oneday;

    if (this.hours >= this.hourDay.day && this.hours < this.hourDay.night) {
      this.status = "Day";
    } else {
      this.status = "Night";
    }

    this.hours = Math.floor(this.time / 3600);
    this.minutes = Math.floor((this.time - this.hours * 3600) / 60);
    if (this.time > oneday) {
      this.hours = this.hours % 24;
    }
    this.days = Math.floor(this.time / onemorning);

    let hourStr = this.hours < 10 ? "0" + this.hours : this.hours;
    let minutesStr = this.minutes < 10 ? "0" + this.minutes : this.minutes;

    this.timeStr = hourStr + "h" + minutesStr;
  }
  getStatus() {
    return this.status;
  }

  getTimeStr() {
    return this.timeStr;
  }

  getHours() {
    return this.hours;
  }

  getMinutes() {
    return this.minutes;
  }

  getDays() {
    return this.days;
  }

  getTime() {
    return this.time;
  }

  setTime(time: number) {
    this.time = time;
  }
}
