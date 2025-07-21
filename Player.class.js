
class Player {
  
  constructor(pPos, pHigh, h){
    this.weapon = 2; //starting weapon pistol
    this.pPos = pPos;
    this.pHigh = pHigh;
    this.h = h;
  }
  
  changeWeapon(weapon){
    this.weapon = weapon
  }
  
  cycleWeapon(){
    this.weapon++;
    if(this.weapon > 5){
      this.weapon = 1;
    }
  }
  
  move(x){
    this.pPos = x;
  }
  
  
  draw(){
    if (this.weapon == 1) {
    image(
      fists,
      55 + this.pPos * (40 - (this.pHigh / 375) * 20),
      this.h - this.pHigh - 10,
      100,
      50
    );
  }
  if (this.weapon == 2) {
    image(
      pistol,
      83 + this.pPos * (40 - (this.pHigh / 375) * 20),
      this.h - this.pHigh - 10,
      50,
      75
    );
  }
  if (this.weapon == 3) {
    image(
      shotgun,
      83 + this.pPos * (40 - (this.pHigh / 375) * 20),
      this.h - this.pHigh - 10,
      50,
      50
    );
  }
  if (this.weapon == 4) {
    image(
      revolver,
      83 + this.pPos * (40 - (this.pHigh / 375) * 20),
      this.h - this.pHigh - 20,
      75,
      75
    );
  }
  if (this.weapon == 5) {
    image(
      bfg9000,
      61 + this.pPos * (40 - (this.pHigh / 375) * 20),
      this.h - this.pHigh - 20,
      100,
      75
    );
  }
  }
}

