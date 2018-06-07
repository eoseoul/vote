
export default class Latency {
  constructor() {
    this.ms = 0;
  }

  start() {
    this.time = parseInt(new Date().getTime() / 1000, 10);
    this.ms = 0;
  }

  end() {
    const time = parseInt(new Date().getTime() / 1000, 10);
    this.ms = this.time - time;
    return this.ms;
  }
}
