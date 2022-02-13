import './App.css';
import React, {useEffect, useRef} from "react";

function App() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    setCanvasSize(canvas);

    const ctx = canvas.getContext('2d');

    let numberOfPlayers = 1;

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

function Ball(canvas, ctx) {
  let startingVelocity = {dx: 5, dy: 5};
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

    if( this.position.y + this.radius > this.canvas.height || this.position.y - this.radius < 0) {
      this.velocity.dy *= -1;
    }

    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy

    this.draw();
  }

}

function initiatePong(canvas, ctx, players) {

  console.log(players)

  let ballArray = [];
  let paddleArray = [];

  ballArray.push(new Ball(canvas, ctx))

  for (let i = 0; i < 2; i++) {
    let player;
    switch(players) {
      case 1:
        player = "p1";
        break;
      case 2:
        player = "p2";
        break;
      default:
        player = "ai";
        break;
    }
    paddleArray.push(new Paddle(canvas, ctx, player))

    players--;
  }
  console.log(paddleArray)
  animate(canvas, ctx, ballArray, paddleArray);

}

function animate(canvas, ctx, ballArray, paddleArray) {
  requestAnimationFrame(function() {animate(canvas, ctx, ballArray, paddleArray);})

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
  for (let i = 0; i < paddleArray.length; i++) {
    paddleArray[i].draw();
  }
}

function Paddle(canvas, ctx, player) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.player = player;
  this.size = {width: 25, height: 300};
  this.position = {x: setPosition(this.canvas, this.player, 40), y: canvas.height / 2};
  this.color = {r: 255, g: 255, b: 255};

  this.draw =function() {
    this.ctx.beginPath();
    this.ctx.fillRect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
    this.ctx.fillStyle = `rgb(${this.color.r},${this.color.g}, ${this.color.b})`;
    this.ctx.fill();
  }

  this.update = function() {

    this.draw();
  }

}

function setPosition(canvas, player) {

  const position = 50;

  switch(player) {
    case "p1":
      return position;
    case "p2":
      return canvas.width - position;
    default:
      return canvas.width - position;
  }
}