
class Enemy {
  constructor(speed, screenH, lineNumber, lines, typeEnemy) {
    this.speed = speed;
    this.attack = false;
    this.screenHeight = screenH;
    this.lineNumber = lineNumber;
    this.lines = lines;
    this.typeEnemy = typeEnemy;
    this.garbage = false;
    //this.faces = ["💀", "😵", "😐", "😮", "🤠"];
    //saved ☢️ ⏱️ 💎 📀 🪙 💣 🟢 💥 🙊 🎁 🔫||
    //this.faces = ["🎱", "🔴", "🟠", "🟡", "⚪"];
    //this.faces = ["🐵", "🙉", "🙈"];
    this.faces = ["💀", "😡"];
    this.powers = ["🔫", "☢️", "💎", "🎁"];
    this.damage = this.faces.length - 1;
    //this.openGift = this.powers.length - 1;
    this.damage = this.faces.length - 1;
    this.y = 225;
    this.x = 200 + this.lineNumber * (200 / this.lines);
    this.move = true;
    this.waitTime = Math.floor(random(0, 50));
    this.attack = false;
    //this.powerUpChance = 0.05; // Math.floor(random(0, 2000));
  }

  draw() {
    if (this.garbage) {
      return;
    }
    //Enemy
    let enemySize = map(this.y, 225, 560, 10, 50, true);
    let enemyOffset = map(this.y, 225, 560, -7.5, -25, true);
    //let enemyFace = Math.floor(map(this.y, 225, 560, 0, 5, true));
    
    textSize(enemySize);
    if (this.damage < 0 || this.damage >= this.faces.length) {
      this.damage = 0;
    }
    if(this.typeEnemy == 1){
      text(this.faces[this.damage], this.x + enemyOffset, this.y + 10);
    }
    else if(this.typeEnemy == 2){
      text(this.powers[0], this.x + enemyOffset, this.y + 10);
    }
    
    this.update();
    /*else{
      this.isPowerUp = false;
      //Powerup
      let enemySize = map(this.y, 225, 560, 10, 50, true);
      let enemyOffset = map(this.y, 225, 560, -7.5, -25, true);
      //let enemyFace = Math.floor(map(this.y, 225, 560, 0, 5, true));

      textSize(enemySize);
      if (this.openGift < 0 || this.openGift >= this.powers.length) {
        this.openGift = 0;
      }
      text(this.powers[this.openGift], this.x + enemyOffset, this.y + 10);
      this.update();
    }*/
    
  }

  update() {
    if (this.move && this.waitTime == 0) {
      this.y += 375 / this.speed;
      this.x =
        this.x + (-100 + (200 * this.lineNumber) / this.lines) / this.speed;
      //console.log(this.lineNumber, this.lines, this.speed, this.x)
      this.attack = false;
    }

    if (this.y > this.screenHeight - 45) {
      if(this.typeEnemy == 2){
        this.attack = false;
        this.move = false;
      }
      else{
        this.attack = true;
        this.move = false;
      }
    }

    if (this.waitTime > 0) {
      this.waitTime--;
    }
    /*if (this.powerUpChance <= 0.05){
      this.isPowerUp = true;
    }*/
  }

  /**
   * checks if bullet hits enemy
   * @var int x bullet x
   * @var int y bullet y
   * @return int hit 0 = no hit; 1 = hit; 2 = kill
   */
  hit(l, y) {
    let ret = 0;
    if (l == this.lineNumber) {
      if (y <= this.y + 15 && y >= this.y - 15) {
        this.damage--;
        if (this.damage < 0) {
          this.kill();
          ret = 2;
        } else {
          ret = 1;
        }
      }
    }
    return ret;
  }
  kill() {
    this.garbage = true;
  }
}