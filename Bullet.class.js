
class Bullet {
  constructor(x, y, speed, lineNumber, lines, lineSpace, energyBullet) {
    this.x = 110 + x * (40 - (40 / 375) * 20);
    this.y = y;
    this.speed = speed;
    this.garbage = false;
    this.lineNumber = lineNumber;
    this.lines = lines;
    this.lineSpace = lineSpace;
    this.energyBullet = energyBullet;
  }

  draw() {
    if (this.garbage) {
      return;
    }
    if (this.energyBullet) {
      stroke("#00FF28");
      fill("#00FF28");
      rect(this.x - 2.5, this.y, 5, 15);
    } else {
      stroke("#FFE200");
      fill("#FFE200");
      rect(this.x - 2.5, this.y, 5, 5);
    }

    this.hit();
    this.update();
  }

  hit() {
    //Out of bounds check
    if (this.y <= 225) {
      this.kill();
    }
  }

  update() {
    //this.y -= this.speed;

    this.y -= 375 / this.speed;
    this.x = this.x + (100 - (200 * this.lineNumber) / this.lines) / this.speed;
  }

  kill() {
    this.garbage = true;
  }
}