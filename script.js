const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 300;
canvas.height = 100;

// Fill canvas with gray (the "scratch" layer)
ctx.fillStyle = "#bbbbbb"; // color pricipal #bbbbbb
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isScratching = false;

function getEventLocation(event) {
  const rect = canvas.getBoundingClientRect();
  // Handle both mouse and touch events
  if (event.touches) {
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top,
    };
  } else {
    // Mouse events
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
}

function scratch(e) {
  if (isScratching) {
    const pos = getEventLocation(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

canvas.addEventListener("mousedown", (e) => {
  isScratching = true;
  scratch(e);
});

canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("mouseup", () => {
  isScratching = false;
});

canvas.addEventListener("mouseleave", () => {
  isScratching = false;
});

canvas.addEventListener(
  "touchstart",
  (e) => {
    isScratching = true;
    scratch(e);
  },
  false
);

canvas.addEventListener("touchmove", scratch, false);

canvas.addEventListener(
  "touchend",
  () => {
    isScratching = false;
  },
  false
);
