

  const container = document.getElementById("pixi-container");
   app = new Application();
  
    await app.init({ background: "#1099bb", resizeTo: container});
    container.appendChild(app.canvas);
  // -----------------------------------------
  // WORLD
  // -----------------------------------------
  const world = new Container();
  app.stage.addChild(world);

  const WORLD_WIDTH = 2000;
  const WORLD_HEIGHT = 2000;
  const trailLayer = new Container();
  world.addChild(trailLayer);
  // -----------------------------------------
  // PLAYER
  // -----------------------------------------
  const player = new Graphics()
  player.drawPolygon([
    0, 30,   // bottom-left
    30, 30,  // bottom-right
    15, 0    // top-middle
    ]);

player.endFill();
player.pivot.set(15, 15);

player.x = WORLD_WIDTH / 2
player.y = WORLD_HEIGHT / 2

  player.rotation=0
  world.addChild(player);

  // -----------------------------------------
  // WALLS
  // -----------------------------------------
  const walls = [];

  function createWall(x, y, w, h) {
    const wall = new Graphics()
      .beginFill(0x333333)
      .drawRect(0, 0, w, h)
      .endFill();

    wall.x = x;
    wall.y = y;

    walls.push(wall);
    world.addChild(wall);
  }

  

  function collides(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // -----------------------------------------
  // INPUT
  // -----------------------------------------
  const keys = {};
  let lastDir = "right";

  const keydown = (e) => (keys[e.key] = true);
  const keyup = (e) => (keys[e.key] = false);

  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);

  // -----------------------------------------
  // MOVEMENT
  // -----------------------------------------
  const speed = 4;
let angleStep = (30 * Math.PI) / 180; // 20 degrees

let currentAngle = 0;

  function move(dx, dy, dirName) {
    player.x += dx;
    if (walls.some((w) => collides(player, w))) player.x -= dx;

    player.y += dy;
    if (walls.some((w) => collides(player, w))) player.y -= dy;

    lastDir = dirName;
  }

  // -----------------------------------------
  // CAMERA
  // -----------------------------------------
  function updateCamera() {
    const screenW = app.screen.width;
    const screenH = app.screen.height;

    world.x = -player.x + screenW / 2;
    world.y = -player.y + screenH / 2;

    // clamp
    world.x = Math.min(0, Math.max(world.x, screenW - WORLD_WIDTH));
    world.y = Math.min(0, Math.max(world.y, screenH - WORLD_HEIGHT));
  }
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") {
    currentAngle -= angleStep;  // rotate CCW

    if (currentAngle <= -Math.PI * 2) {
      currentAngle += Math.PI * 2;
    }
    pub.publish({data:"q"});

    player.rotation = currentAngle;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    currentAngle += angleStep;  // rotate CCW

    if (currentAngle >= Math.PI * 2) {
      currentAngle -= Math.PI * 2;
    }
    pub.publish({data:"e"});

    player.rotation = currentAngle;
    
  }
});
  // -----------------------------------------
  // GAME LOOP
  // -----------------------------------------


  listener.subscribe(function (message) {

        console.log(
          "Received message on " + listener.name + ": " + message.data,
        );

        // If desired, we can unsubscribe from the topic as well.
        //listener.unsubscribe();
      });
  app.ticker.add(() => {
    if (keys["ArrowUp"]){
        let vectorX = 0;
        let vectorY =0;
        vectorX = Math.sin(player.rotation) * speed;
        vectorY = -Math.cos(player.rotation) * speed;

        move(vectorX, vectorY, "down");
                const dot = new Graphics()
          .beginFill(0xffffff, 0.6)
          .drawCircle(0, 0, 3)
          .endFill();
        dot.x = player.x;
        dot.y = player.y;
        pub.publish({data:"f"});
        trailLayer.addChild(dot);
    };
    if (keys["ArrowDown"]) {
        let vectorX = 0;
        let vectorY =0;
        console.log(player.rotation)  
        vectorX = -Math.sin(player.rotation) * speed;
        vectorY = Math.cos(player.rotation) * speed;
        move(vectorX, vectorY, "down");
        const dot = new Graphics()
          .beginFill(0xffffff, 0.6)
          .drawCircle(0, 0, 3)
          .endFill();
        dot.x = player.x;
        dot.y = player.y;
        pub.publish({data:"b"});
        trailLayer.addChild(dot);
    }



    updateCamera();
  });

    // CLEANUP WHEN COMPONENT UNMOUNTS
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", keydown);
    window.removeEventListener("keyup", keyup);

    app.destroy(true);
  });