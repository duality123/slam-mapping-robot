export default class GameObject{
    constructor({coordinates,img,rows=0,cols=0,scale=1}){
        this.coordinates = coordinates
        this.src=img
        this.rows = rows
        this.cols= cols
        this.scale=scale
    }
    
    update(){
      this.draw()
    }
}