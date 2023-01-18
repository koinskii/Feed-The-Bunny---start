const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var fruit
var rope 
var link
var bgimg
var fruitimg
var bunny
var eat
var sad
var blink
var button1
function preload() {
  //carregando images
  bgimg = loadImage("./images/background.png")
  eat = loadAnimation("./images/eat_0.png","./images/eat_1.png","./images/eat_2.png","./images/eat_3.png","./images/eat_4.png")
  sad = loadAnimation("./images/sad_1.png","./images/sad_2.png","./images/sad_3.png")
  blink = loadAnimation("./images/blink_1.png","./images/blink_2.png","./images/blink_3.png")
  fruitimg = loadImage("./images/melon.png")
 
  //animação começar tocando
  blink.playing = true
  eat.playing = true
  sad.playing = true

  //loop da animação
  sad.looping = false
  eat.looping = false


}


function setup() {
  createCanvas(500, windowHeight-1);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground()
  fruit = Bodies.circle(50,200,10)

  World.add(world,fruit)

  rope = new Rope(7,{x:150, y:50})

  //botões
  button1 = createImg("./images/cut_btn.png")
  button1.size(50, 50)
  button1.position(130, 50)
  button1.mouseClicked(drop)

  Matter.Composite.add(rope.body,fruit)

  link = new Link(rope,fruit)

//animações lentas
  blink.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20

  //Sprite do coelho
  bunny = createSprite(170, height - 80, 100, 100)
  bunny.scale = 0.2
  bunny.addAnimation("blink", blink)
  bunny.addAnimation("eat", eat)
  bunny.addAnimation("sad", sad)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() {
  background(51);
  image(bgimg, width/2, height/2, width, height)
  Engine.update(engine);


  ground.display()
  fill("yellow")
  image(fruitimg,fruit.position.x,fruit.position.y,60,60)
  rope.show()

  drawSprites();
}

function drop() {
  rope.break()
  link.detach()

  link = null
}


