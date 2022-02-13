import './App.css';
import React, {useEffect, useRef} from "react";

function App() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    setCanvasSize(canvas);

    const ctx = canvas.getContext('2d');

    initiatePong(canvas, ctx);
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

function initiatePong(canvas, ctx) {

  let ballArray = [];

  ballArray.push(new Ball(canvas, ctx))

  animate(canvas, ctx, ballArray);

}

function animate(canvas, ctx, ballArray) {
  requestAnimationFrame(function() {animate(canvas, ctx, ballArray);})

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}
