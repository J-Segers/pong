import './App.css';
import React, {useEffect, useRef} from "react";

function App() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    setCanvasSize(canvas);

    const ctx = canvas.getContext('2d');

    let numberOfPlayers = 0;

    initiatePong(canvas, ctx, numberOfPlayers);

  });

  return (

    <div className="App">

      <canvas ref={canvasRef}/>

    </div>

  );

}

export default App;

function setCanvasSize(canvas) {

  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;

}

//ball component and corresponding function from here
function Ball(canvas, ctx) {

  let startingVelocity = setBallVelocity();
  let startingPosition = {x: canvas.width / 2, y: canvas.height / 2};

  this.canvas = canvas;
  this.ctx = ctx;
  this.position = startingPosition;
  this.velocity = startingVelocity
  this.radius = 25;
  this.color = {r: 255, g: 255, b: 255};

  this.draw = function() {

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = `rgb(${this.color.r},${this.color.g}, ${this.color.b})`;
    this.ctx.fill();

  }

  this.update = function() {
    if(this.position.x + this.radius > this.canvas.width || this.position.x - this.radius < 0) {

      this.velocity.dx *= -1;

    }

    if(this.position.y + this.radius > this.canvas.height || this.position.y - this.radius < 0) {

      this.velocity.dy *= -1;

    }

    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy

    this.draw();

  }

  function setBallVelocity() {

    const velocity = {dx: 5, dy: undefined};

    velocity.dx *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    velocity.dy = Math.ceil(Math.random() * 100 / 10) % 5;
    velocity.dy *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    return velocity;

  }

}
//----------------------------------------------------------------------------------------------------------------------

//paddle component and corresponding function from here
function Paddle(canvas, ctx, player) {

  this.canvas = canvas;
  this.ctx = ctx;
  this.player = player;
  this.size = {width: 25, height: 300};
  this.position = setPaddlePosition(this.canvas, this.player, 40);
  this.color = {r: 255, g: 255, b: 255};
  this.velocity = setRandomPaddleDirection();

  this.draw = function() {

    this.ctx.beginPath();
    this.ctx.fillRect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
    this.ctx.fillStyle = `rgb(${this.color.r},${this.color.g}, ${this.color.b})`;
    this.ctx.fill();

  }

  this.update = function() {

    if(this.position.y - this.size.height / 2 < 0 || this.position.y + this.size.height / 2 > canvas.height){

      this.velocity = -this.velocity;

    }

    this.position.y += this.velocity;

    this.draw();

  }

}

function setPaddlePosition(canvas, player) {
  const xPos = 50;

  const position = {x: undefined, y: canvas.height / 2};

  switch(player) {

    case "p1":
      position.x = xPos;
      break;
    case "p2":
      position.x = canvas.width - xPos;
      break;
    case "ai":
      position.x = canvas.width - xPos;
      break;
    case "ai2":
      position.x = xPos;
      break;
    default:
      position.x = canvas.width - xPos;
      break;

  }

  return position;

}

function setRandomPaddleDirection() {

  let velocity = 5;

  velocity *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

  return velocity;

}
//----------------------------------------------------------------------------------------------------------------------


function initiatePong(canvas, ctx, players) {

  console.log(players)

  let ballArray = [];
  ballArray.push(new Ball(canvas, ctx));

  let paddleArray = [];
  let player;
  let aiExists = false;

  for (let i = 0; i < 2; i++) {

    switch(players) {

      case 0:
        if(aiExists){
          player = "ai2"
        } else {
          player = "ai";
          aiExists = true;
        }
        break;
      case 1:
        player = "p1";
        players--;
        break;
      case 2:
        player = "p2";
        players--;
        break;
      default:
        player = "ai";
        break;

    }

    paddleArray.push(new Paddle(canvas, ctx, player))

  }

  animate(canvas, ctx, ballArray, paddleArray);

}

function animate(canvas, ctx, ballArray, paddleArray) {

  requestAnimationFrame(function() {animate(canvas, ctx, ballArray, paddleArray);})

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < ballArray.length; i++) {

    ballArray[i].update();

  }
  for (let i = 0; i < paddleArray.length; i++) {

    paddleArray[i].update();

  }

}
