const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const boxes = [
  {
    id: "box-1",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    color: "gray",
    text: "",
  },
  {
    id: "box-2",
    width: 100,
    height: 100,
    x: 150,
    y: 250,
    color: "red",
    text: "",
  },
  {
    id: "box-3",
    width: 100,
    height: 100,
    x: 180,
    y: 230,
    color: "green",
    text: "",
  },
  {
    id: "box-4",
    width: 100,
    height: 100,
    x: 300,
    y: 300,
    color: "yellow",
    text: "",
  },
];

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drowBox();
});

const mouse = {
  x: 0,
  y: 0,
};

const drowBox = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < boxes.length; index++) {
    const box = boxes[index];
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
  }
  // lines between boxes
  for (let index = 0; index < boxes.length; index++) {
    const box = boxes[index];
    if (index === 0) {
      ctx.beginPath();
      ctx.moveTo(box.x + box.width / 2, box.y + box.height / 2);
      ctx.font = "20px Georgia";
      ctx.font = "30px Verdana";
      ctx.fillText(box.id, box.x + box.width / 4, box.y + box.height / 4);
      ctx.fillText(box.text, box.x + box.width / 4, box.y + box.height / 4);
      ctx.fillStyle = "black";
    } else {
      ctx.lineTo(box.x + box.width / 2, box.y + box.height / 2);
      ctx.moveTo(box.x + box.width / 2, box.y + box.height / 2);
      ctx.font = "20px Georgia";
      ctx.font = "30px Verdana";
      ctx.fillText(box.id, box.x + box.width / 4, box.y + box.height / 4);
      ctx.fillText(box.text, box.x + box.width / 4, box.y + box.height / 4);
      ctx.fillStyle = "black";
    }
  }
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.stroke();
};
let isMouseDown = false;
let clickedBoxID = null;
canvas.addEventListener("mousedown", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  // if i click on the box get the box id
  boxes.forEach((box) => {
    if (
      mouse.x >= box.x &&
      mouse.x <= box.x + box.width &&
      mouse.y >= box.y &&
      mouse.y <= box.y + box.height
    ) {
      clickedBoxID = box.id;
      isMouseDown = true;
      console.log(clickedBoxID);
      console.log(isMouseDown);
    }
  });
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  if (isMouseDown && clickedBoxID) {
    boxes.forEach((box) => {
      if (box.id === clickedBoxID) {
        box.x = mouse.x - box.width / 2;
        box.y = mouse.y - box.height / 2;
      }
    });
  }

  requestAnimationFrame(drowBox);
});

canvas.addEventListener("mouseup", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  isMouseDown = false;
  clickedBoxID = null;
});

drowBox();

canvas.addEventListener("dblclick", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  boxes.forEach((box) => {
    if (
      mouse.x >= box.x &&
      mouse.x <= box.x + box.width &&
      mouse.y >= box.y &&
      mouse.y <= box.y + box.height
    ) {
      // add input field inside the box
      const input = document.createElement("input");
      input.type = "text";
      input.style.position = "absolute";
      input.style.top = box.y + "px";
      input.style.left = box.x + "px";
      input.style.width = box.width + "px";
      input.style.height = box.height + "px";
      input.style.textAlign = "center";
      input.style.background = box.color;
      input.style.color = "black";
      input.value = box.text;
      input.addEventListener("blur", function () {
        box.id = input.value;
        document.body.removeChild(input);
        requestAnimationFrame(drowBox);
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          box.text = input.value;
          document.body.removeChild(input);
          requestAnimationFrame(drowBox);
        }
      });
      document.body.appendChild(input);

      requestAnimationFrame(drowBox);
    }
  });
});
