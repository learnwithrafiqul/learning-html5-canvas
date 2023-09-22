let ws = new WebSocket("ws://localhost:8080");

const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: 0,
  y: 0,
};

let brashColor = "black";
let brashSize = 10;
let isPressed = false;

canvas.addEventListener("mousedown", function (e) {
  isPressed = true;
});

canvas.addEventListener("mouseup", function (e) {
  isPressed = false;
});

let brashDrowRecrod = [];

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  if (isPressed) {
    brashDrowRecrod.push({
      x: mouse.x,
      y: mouse.y,
      color: brashColor,
      size: brashSize,
    });
    // drawCircle(mouse.x, mouse.y, brashSize, brashColor);

    ws.send(
      JSON.stringify({
        x: mouse.x,
        y: mouse.y,
        color: brashColor,
        size: brashSize,
      })
    );
  }
});

ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  console.log("data--->", data);
  drawCircle(data.x, data.y, data.size, data.color);
};

const drawCircle = (x, y, size, color) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  requestAnimationFrame(drawCircle);
};
