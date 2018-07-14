module.exports = class {
  constructor() {
    this.gameTime = 0;
    this.currentTime = null;
    this.previousTimeStamp = 0;
    this.deltaTime = null;
  }
  tick() {
    this.currentTime = Date.now();
    if (this.previousTimeStamp == 0) {
      this.deltaTime = 17;
    } else {
      this.deltaTime = this.currentTime - this.previousTimeStamp;
    }
    this.previousTimeStamp = this.currentTime;
    this.gameTime += this.deltaTime;
    return this.deltaTime;
  }
}
