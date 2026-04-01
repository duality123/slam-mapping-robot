export default class Sprite{
    constructor({coordinates,scale=2.5,velocity=1,color="red",idleSheet,walkSheet}){
      this.coordinates = coordinates
      this.scale=scale
      this.rotation=0
      this.trail = []
      this.canMove=true
      this.collisions=[]
      this.status='idle'
      this.velocity = velocity
      this.offset={x:-80,y:-50}
      this.isAttacking=false
      this.lastKey = null;
      this.isJumping=false
      this.isFallingDown=true
      this.isAttacked=false
      this.gravity = 0.7
      this.isDead=false
      this.spriteSheet = {
        idle:idleSheet,
        walk:walkSheet,
      }
      this.color = color
      this.frameWait=5
      this.frame=0
      this.health = 100;
      this.attackAnimation=false;
      this.onAnimation=false
    }


    attack(){
      this.isAttacking = true
      this.status="attack_animation"
      this.frame=10
      setTimeout(()=>{
        this.isAttacking = false
      },100)
    }
  }

