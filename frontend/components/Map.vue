<template>
  <canvas id="world"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import Background from "@/assets/level/Background.png";
import PlayerWalk from "@/assets/spritesheet/walk.png";
import PlayerIdle from "@/assets/spritesheet/idle.png";
import GameObject from "@/entities/GameObject.js";
import Sprite from "@/entities/Sprite.js";
import * as ROSLIB from "roslib";
let background = new GameObject({coordinates:{x:1000,y:1000},img:Background});
let player1 = new Sprite({coordinates:{x:250,y:250},velocity:4,idleSheet:{sheet:PlayerIdle,cols:11,rows:1,width:794,height:43},walkSheet:{sheet:PlayerWalk,cols:16,rows:1,width:1156,height:39}});
 // -----------------
      var ros = new ROSLIB.Ros();

      // If there is an error on the backend, an 'error' emit will be emitted.
      ros.on("error", function (error) {
        console.log(error);
      });

      // Find out exactly when we made a connection.
      ros.on("connection", function () {
        console.log("Connection made!");
      });

      ros.on("close", function () {
        console.log("Connection closed.");
      });

      // Create a connection to the rosbridge WebSocket server.
      ros.connect("ws://192.168.1.7:9090");

      // Publishing a Topic
      // ------------------

      // First, we create a Topic object with details of the topic's name and message type.
      var pub = new ROSLIB.Topic({
        ros: ros,
        name: "/controller",
        messageType: "std_msgs/String",
      });

      // Then we create the payload to be published. The object we pass in to ros.Message matches the
      // fields defined in the geometry_msgs/Twist.msg definition.
     
      var listener = new ROSLIB.Topic({
        ros: ros,
        name: "/collisions",
        messageType: "std_msgs/Int32",
      });
      // Then we add a callback to be called every time a message is published on this topic.

      // Then we add a callback to be called every time a message is published on this topic.

onMounted(async () => {
      listener.subscribe(function (message) {
        console.log(
          "Received message on " + listener.name + ": " + message.data,
        );
        if(player1.canMove){
          saveCollisions(message.data)
        }
        
        // If desired, we can unsubscribe from the topic as well.
        //listener.unsubscribe();
      });
    function renderMap(map){
      const targetMap = new Image();
      targetMap.src= map.src
      ctx.drawImage(targetMap,map.coordinates.x,map.coordinates.y,1750,1750,0,0,500,500)
    }

    function renderPlayer({player}){
        let numColumns;
        let numRows;

            // Define the size of a frame
        let frameWidth;
        let frameHeight;
        // Make the frames loop
        let maxFrame;
        let column;
        let row;
          
        const sprite = new Image();
        if(player.status=="idle"){
            numColumns = player.spriteSheet.idle.cols;
            numRows =  player.spriteSheet.idle.rows;

            // Define the size of a frame
            frameWidth = player.spriteSheet.idle.width / numColumns ;
            frameHeight = player.spriteSheet.idle.height / numRows;
        // Make the frames loop
            maxFrame = numColumns * numRows - 1;
            if (player.frame > maxFrame){
                player.frame= 0;
            }

            // Update rows and columns
            column = player.frame % numColumns;
            row = Math.floor(player.frame / numColumns);
            sprite.src= player.spriteSheet.idle.sheet
        // Clear and draw
        //ctx.clearRect(0, 0, world.width, world.height);
        }
        else if(player.status=="walk"){
            numColumns = player.spriteSheet.walk.cols;
            numRows =  player.spriteSheet.walk.rows;

            // Define the size of a frame
            frameWidth =player.spriteSheet.walk.width / numColumns ;
            frameHeight = player.spriteSheet.walk.height / numRows;
        // Make the frames loop
            maxFrame = numColumns * numRows - 1;
            if (player.frame > maxFrame){
                player.frame= 0;
            }

            // Update rows and columns
            column = player.frame % numColumns;
            row = Math.floor(player.frame / numColumns);
            sprite.src= player.spriteSheet.walk.sheet          
        }
        const drawX = player.coordinates.x + player.offset.x
        const drawY = player.coordinates.y + player.offset.y
        const drawWidth = frameWidth * player.scale
        const drawHeight = frameHeight * player.scale

        ctx.save()

        // pindahkan origin ke tengah sprite
        ctx.translate(drawX + drawWidth / 2, drawY + drawHeight/1.5)

        // rotate (dalam radian)
        ctx.rotate(player.rotation)

        // gambar sprite dari tengah
        ctx.drawImage(
          sprite,
          column * frameWidth,
          row * frameHeight,
          frameWidth,
          frameHeight,
          -drawWidth / 2,
          -drawHeight/1.5,
          drawWidth,
          drawHeight
        )

        ctx.restore()

       // ctx.drawImage(sprite, column * frameWidth, row * frameHeight, frameWidth, frameHeight, player.coordinates.x+player.offset.x,player.coordinates.y+player.offset.y, frameWidth* player.scale, frameHeight* player.scale);
    }

    function update(){
      if(frameSwitch==3){
        player1.frame++
        frameSwitch=0
      }
      frameSwitch++


    }
 function renderTrail({ player }) {

  ctx.save()
  ctx.fillStyle = "cyan"

  for (const pos of player.trail) {

    // convert world -> screen
    const screenX = pos.x + initX
    const screenY = pos.y + initY

    ctx.fillRect(screenX, screenY, 4, 4)
  }

  ctx.restore()
}
 let collisionsPoint =[]
 collisionsPoint.push({x:background.coordinates.x,y:background.coordinates.y})
 collisionsPoint.push({x:background.coordinates.x,y:background.coordinates.y+10})
 function saveCollisions(distance){
        const forwardX =  Math.sin(player1.rotation)
        const forwardY = -Math.cos(player1.rotation) 
        //for (const pos of collisionsPoint) {

              let dotX =(-background.coordinates.x + world.width/2)+ forwardX * distance
              let dotY =( -background.coordinates.y + world.width/2) + forwardY * distance   
              player1.collisions.push({
                x: dotX,
                y: dotY
              }) 
        //} 
 }
 function renderCollisions({ player }) {


  ctx.save()
  ctx.fillStyle = "red"

  for (const pos of player.collisions) {

    // convert world -> screen
    const screenX = pos.x + initX
    const screenY = pos.y +initY

    ctx.fillRect(screenX, screenY, 4, 4)
  }

  ctx.restore()
}

    let initX = background.coordinates.x
    let initY = background.coordinates.y
    let frameSwitch=0
    const world = document.getElementById("world");
    const ctx = world.getContext("2d")
    world.width = 500;
    world.height = 500;

    const keys={a:{pressed:false},
                s:{pressed:false},
                w:{pressed:false},
                d:{pressed:false},
    }
    function Loop(){
      ctx.fillStyle="black"
      ctx.fillRect(0,0,500,500)
      renderMap(background)
      renderTrail({player:player1})
      renderPlayer({player:player1})
      renderCollisions({player:player1})
      update()
      if(keys.a.pressed && player1.lastKey=="a" && player1.canMove){
          //background.coordinates.x -= 5
          //player1.coordinates.x += player1.velocity
          //const cameraX =(player1.coordinates.x  + world.width +player1.offset.x/ 2);
          //background.coordinates.x += 5
          if(player1.canMove){
            pub.publish({data:"a"});
            player1.rotation -= 0.5
          }
          player1.canMove=false;
          setTimeout(()=>{
            player1.canMove=true
          },6000)
      }
      else if(keys.d.pressed && player1.lastKey=="d" && player1.canMove){
          //player1.coordinates.x += player1.velocity
          const cameraX =(player1.coordinates.x  + world.width +player1.offset.x/ 2);
          //background.coordinates.x += 5
          if(player1.canMove){
            pub.publish({data:"d"});
            player1.rotation += 0.5
          }
          player1.canMove=false;
          setTimeout(()=>{
            player1.canMove=true
          },6000)

      }      
      else if(keys.w.pressed && player1.lastKey=="w" && player1.canMove){
 
        const speed = 10
        //
        const dx = Math.sin(player1.rotation) * speed
        const dy = -Math.cos(player1.rotation) * speed
        if(player1.canMove){
          // 1️⃣ Simpan posisi player SAAT INI (sebelum gerak)
          const worldX = -initX + world.width/2
          const worldY = -initY + world.height/2
          pub.publish({data:"w"});
          player1.trail.push({
            x: worldX,
            y: worldY
          })
          initX -= dx
          initY -= dy
          //pub.publish({data:"w"});
          background.coordinates.x += dx
          background.coordinates.y += dy
        }
        player1.canMove=false;
        if (player1.trail.length > 1000) {
          player1.trail.shift()
        }
        setTimeout(()=>{
          player1.canMove=true
        },6000)

        //background.coordinates.x = player1.coordinates.x+player1.offset.x + world.width / 2;
        //background.coordinates.y -= player1.velocity + world.height / 2;

        // clamp
        //background.coordinates.x = Math.min(0, Math.max(background.coordinates.x, 500- 3500));
        //background.coordinates.y = Math.min(0, Math.max(background.coordinates.y, 500 - 3500));
      }
           
      else if(keys.s.pressed && player1.lastKey=="s" && player1.canMove){
        const speed = 8

        const dx = Math.sin(player1.rotation) * speed
        const dy = -Math.cos(player1.rotation) * speed
        if(player1.canMove){
          const worldX = -initX + world.width/2
          const worldY = -initY + world.height/2

          player1.trail.push({
            x: worldX,
            y: worldY
          })
          initX += dx
          initY += dy
          pub.publish({data:"s"});
          background.coordinates.x -= dx
          background.coordinates.y -= dy
        }
        player1.canMove=false;
        setTimeout(()=>{
          player1.canMove=true
        },6000)
        if (player1.trail.length > 1000) {
          player1.trail.shift()
        }
      }

      window.requestAnimationFrame(Loop)
    }  
    //saveCollisions(20)
    //saveCollisions(30)
    Loop()
    ///pub.publish({data:"s"});
  window.addEventListener('keydown',(event)=>{
      console.log(event)
      player1.status="walk"
        switch(event.key){
          case 'd':
            keys.d.pressed = true
            player1.lastKey = "d"
            break
          case 'a':
            keys.a.pressed = true
            player1.lastKey = "a"
            break
          case 'w':
            keys.w.pressed = true
            player1.lastKey = "w"
            break
          case "s":
            keys.s.pressed = true
            player1.lastKey = "s"
            break
    }

  })

  window.addEventListener('keyup',(event)=>{
  switch(event.key){   
        case 'd':
          keys.d.pressed = false
          player1.lastKey=""
          player1.status ="idle"
          player1.frame=0
          break
        case 'a':
          keys.a.pressed = false
          player1.lastKey=""
          player1.status ="idle"
          player1.frame=0
          break
        case 's':
          keys.s.pressed = false
          player1.lastKey=""
          player1.status ="idle"
          player1.frame=0
          break
        case 'w':
          keys.w.pressed = false
          player1.lastKey=""
          player1.status ="idle"
          player1.frame=0
          break
      }
  })
});
</script>
