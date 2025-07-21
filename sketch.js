//variables
let h = 600;
let w = 600;
let death = 0;
let lines = 10;
let xPos = 5; //Player x position
let lineSpace = 400 / lines;
let deathAlt = false;
let enemies = [];
let bullets = [];
let pHigh = 40;
const bulletMax = 12; //wait rate
let bulletTime = bulletMax;

//preload images
let fists;
let pistol;
let shotgun;
let revolver;
let bfg9000;

//let weapon = 1;
let enemyMarch = 1000; //initial enemy speed
let terminated = 0; //enemies killed

function preload() {
  fists = loadImage("fists.png");
  pistol = loadImage("pistol.png");
  shotgun = loadImage("shotgun.png");
  revolver = loadImage("revolver.png");
  bfg9000 = loadImage("bfg.png");
}



function setup() {
  createCanvas(w, h);
  
  player = new Player(xPos, pHigh, h);
}

function draw() {
  background("#FD711C");

  textSize(345);
  text("🧠", 125, 300);

  fill("#444444");
  stroke("#444444");
  rect(0, 225, 600, 375);
  fill("#FBFBFB");
  stroke("#FBFBFB");
  rect(0, 540, 600, 60);

  //Player Mouselook
  //xPos = Math.floor((mouseX / w) * lines);
  xPos = Math.floor(map(mouseX, 0, w, 0, lines, true));
  player.move(xPos);
  
  //Fists
  if (keyIsDown(SHIFT) && xPos > 2 && xPos < 7) {
    player.changeWeapon(1);
    if (keyIsDown(LEFT_ARROW)) {
      xPos -= 3;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      xPos += 3;
    }
  }
  player.move(xPos);
  
  //Weapons   // x, y, speed, lineNumber, lines, lineSpace, energyBullet
  if (mouseIsPressed && bulletTime == 0) {
    if (mouseButton === LEFT) {
      if(player.weapon == 2)
      {
        //Pistol
        bullets.push(
          new Bullet(xPos, h - pHigh, 45, xPos, lines, lineSpace, false)
        );
        bulletTime = bulletMax;
        textSize(40);
        text("💥", 93 + xPos * (40 - (pHigh / 375) * 20), h - pHigh);
      }
      
      if(player.weapon == 3){
        //Shotgun
        bullets.push(
          new Bullet(xPos, h - pHigh, 45, xPos, lines, lineSpace, false)
        );
        if (xPos > 0) {
          bullets.push(
            new Bullet(
              xPos - 1,
              h - pHigh,
              45,
              xPos - 1,
              lines,
              lineSpace - 1,
              false
            )
          );
        }
        if (xPos < 10) {
          bullets.push(
            new Bullet(
              xPos + 1,
              h - pHigh,
              45,
              xPos + 1,
              lines,
              lineSpace + 1,
              false
            )
          );
        }
        bulletTime = bulletMax + 50;
        textSize(55);
        text("💥", 83 + xPos * (40 - (pHigh / 375) * 20), h - pHigh);
      }
      
      if (player.weapon == 4) {
        //Revolver
        bullets.push(
          new Bullet(xPos, h - pHigh, 45, xPos, lines, lineSpace, false)
        );
        bullets.push(
          new Bullet(xPos, h - pHigh - 10, 45, xPos, lines, lineSpace, false)
        );
        bulletTime = bulletMax + 35;
        textSize(55);
        text("💨", 83 + xPos * (40 - (pHigh / 375) * 20), h - pHigh);
      }
      
      //BFGstart
      if(player.weapon == 5){
      //BFG9000
      bullets.push(
        new Bullet(xPos, h - pHigh, 25, xPos, lines, lineSpace, true)
      );
      bullets.push(
        new Bullet(xPos, h - pHigh + 10, 25, xPos, lines, lineSpace, true)
      );
      if (xPos > 0) {
        bullets.push(
          new Bullet(
            xPos - 1,
            h - pHigh,
            25,
            xPos - 1,
            lines,
            lineSpace - 1,
            true
          )
        );
        bullets.push(
          new Bullet(
            xPos - 1,
            h - pHigh + 10,
            25,
            xPos - 1,
            lines,
            lineSpace - 1,
            true
          )
        );
      }
      if (xPos > 1) {
        bullets.push(
          new Bullet(
            xPos - 2,
            h - pHigh,
            25,
            xPos - 2,
            lines,
            lineSpace - 2,
            true
          )
        );
        bullets.push(
          new Bullet(
            xPos - 2,
            h - pHigh + 10,
            25,
            xPos - 2,
            lines,
            lineSpace - 2,
            true
          )
        );
      }
      if (xPos < 9) {
        bullets.push(
          new Bullet(
            xPos + 2,
            h - pHigh,
            25,
            xPos + 2,
            lines,
            lineSpace + 2,
            true
          )
        );
        bullets.push(
          new Bullet(
            xPos + 2,
            h - pHigh + 10,
            25,
            xPos + 2,
            lines,
            lineSpace + 2,
            true
          )
        );
      }
      if (xPos < 10) {
        bullets.push(
          new Bullet(
            xPos + 1,
            h - pHigh,
            25,
            xPos + 1,
            lines,
            lineSpace + 1,
            true
          )
        );
        bullets.push(
          new Bullet(
            xPos + 1,
            h - pHigh + 10,
            25,
            xPos + 1,
            lines,
            lineSpace + 1,
            true
          )
        );
      }
      bulletTime = bulletMax + 0;
      textSize(75);
      text("❇️", 75 + xPos * (40 - (pHigh / 375) * 20), h - pHigh);
      }
    }
      //BFGend
      }

  if (bulletTime > 0) {
    bulletTime--;
  }

  //Brain Battery
  fill("#F7D8E6");
  stroke("#F7D8E6");
  rect(200, 100, 200, 125);
  fill("#C4617D");
  rect(200, 100, death * 2, 125);
  textSize(47.5);
  fill("#000000");
  stroke("#000000");
  text(Math.floor(death) + "%", 270, 180);

  //Lines
  stroke("white");
  for (let i = 0; i <= lines; i++) {
    line(200 + i * (200 / lines), 225, 100 + i * (400 / lines), h);
  }

  //Enemy
  if (frameCount % 75 == 0) {
    //enemy   speed, screenH, lineNumber, lines
    let i = Math.floor(random(0, lines + 1));
    let t = frameCount % 750 == 0 ? 2 : 1;
    enemies.push(new Enemy(enemyMarch, h, i, lines, t));
  }

  for (let enemy of enemies) {
    enemy.draw();
  }
  fill(255, 255, 255);
  textSize(32);
  stroke("#FFFFFF");
  text(terminated, 485, 63);
  text("brained", 475, 33);
  //text("slow: " + enemyMarch, 425, 63);

  //Player
  player.draw();
  

  fill("white");
  stroke("white");

  //Bullet
  for (let bullet of bullets) {
    bullet.draw();
  }
  fill(255, 255, 255);
  textSize(32);
  //text("dev:" + bullets.length, 10, 30);
  text("lock time " + bulletTime, 10, 33);

  garbageCollector();

  hit();

  playerDeath();

  if (death >= 100) {
    noLoop();
  }
}

function mouseReleased(event){
  if(event.button == 2){
    player.cycleWeapon();
  }
}

/*
function keyPressed() {
  if (keyIsDown(LEFT_ARROW) && xPos > 0) {
    xPos--;
  }
  if (keyIsDown(RIGHT_ARROW) && xPos < lines) {
    xPos++;
  }
}*/

function hit() {
  //Enemies hit check
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      //if ( ! bullet.garbage && ! enemy.garbage) {
      if (bullet.garbage || enemy.garbage) {
        //If either is garbage do NOT check for hit
      } else {
        //0 = no hit; 1 = hit; 2 = kill
        let i = enemy.hit(bullet.lineNumber, bullet.y);

        if (i == 0) {
          //missed me hahaha
        } else {
          playerDamage(-1);
          bullet.kill();
          if (i == 2) {
            if(enemy.typeEnemy == 2){
              enemy.kill();
              //Powerup acquired
            }
            else{
              terminated++;
              enemyMarching();
              enemy.kill();
            }
          }
        }
      }
    }
  }

  //Player hit check & Battery Death
  for (let enemy of enemies) {
    if (enemy.attack) {
      playerDamage(0.1);
    }
  }
}

function enemyMarching() {
  enemyMarch = 7 + enemyMarch - enemyMarch / 10; //1000 initial
}

function playerDamage(d) {
  //Enemy Damaging player
  if (d > 0) {
    if (death + d <= 100) {
      death += d;
    } else {
      death = 100;
    }
  }
  //Player Health up
  else {
    if (death + d >= 0) {
      death += d;
    } else {
      death = 0;
    }
  }
}

function playerDeath() {
  if (death >= 100) {
    fill("#C4617D");
    stroke("#C4617D");
    rect(200, 100, 200, 125);
    stroke("#000000");
    fill("#000000");
    for (let enemy of enemies) {
      enemy.draw();
    }
    if (deathAlt == true) {
      textSize(50);
      text("BLOWN", 207.5, 155);
      text("OVER", 230, 210);
    }
    if (deathAlt == false) {
      textSize(40);
      text("Creeping", 220, 143);
      text("Deadline", 219.4, 180);
      text("Reached", 220, 215);
    }
  }
}

function garbageCollector() {
  var i = bullets.length;
  while (i--) {
    if (bullets[i].garbage) {
      bullets.splice(i, 1);
    }
  }
  var i = enemies.length;
  while (i--) {
    if (enemies[i].garbage) {
      enemies.splice(i, 1);
    }
  }
}

document.oncontextmenu = function () {
  return false;
};
