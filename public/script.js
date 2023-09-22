let ws = new WebSocket("ws://localhost:8080");

const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - canvas.offsetLeft;
canvas.height = window.innerHeight - canvas.offsetTop;
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth - canvas.offsetLeft;
  canvas.height = window.innerHeight - canvas.offsetTop;
});

const mouse = {
  x: 0,
  y: 0,
};

let brashColor = "black";
let brashSize = 5;
let isPressed = false;

canvas.addEventListener("mousedown", function (e) {
  isPressed = true;
});

canvas.addEventListener("mouseup", function (e) {
  isPressed = false;
  ctx.stroke();
  ctx.beginPath();
});

const draw = (x, y, size, color) => {
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.stroke();
};

canvas.addEventListener("mousemove", (e) => {
  // draw(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);

  if (isPressed) {
    ws.send(
      JSON.stringify({
        x: e.clientX - canvasOffsetX,
        y: e.clientY - canvasOffsetY,
        size: brashSize,
        color: brashColor,
      })
    );
  }



  // if mouse is move dro a box top of mouse cursor

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.arc(e.x, e.y, 20, 0, Math.PI * 10);
  // ctx.fillStyle = brashColor;
  // ctx.fill();
  // ctx.beginPath();
});

ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  console.log({ data });
  draw(data.x, data.y, data.size, data.color);
};



