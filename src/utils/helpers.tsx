// import { CircleType } from "../types/circle";
export const canvasFunctions = (ctx: CanvasRenderingContext2D | null) => {
  const drawCircle = (
    x: number,
    y: number,
    radius: number,
    type = "stroke",
    color = genColor()
  ) => {
    if (ctx) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      if (type === "stroke") {
        stroke(color);
      } else if (type === "fill") {
        fill(color);
      }
    }
  };

  const drawCycle = (c: Circle) => {
    drawCircle(c.x, c.y, c.radius, c.style, c.color);
  };

  const drawRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    type = "stroke",
    color = genColor()
  ) => {
    if (ctx) {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.closePath();
      if (type === "stroke") {
        stroke(color);
      } else if (type === "fill") {
        fill(color);
      }
    }
  };

  const stroke = (color = genColor()) => {
    if (ctx) {
      const prevColor = ctx.strokeStyle;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.strokeStyle = prevColor;
    }
  };

  const fill = (color = genColor()) => {
    if (ctx) {
      const prevColor = ctx.fillStyle;
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = prevColor;
    }
  };

  const randomX = (r: number) =>
    Math.floor(Math.random() * (window.innerWidth - r - 1) + r + 1);
  const randomY = (r: number) =>
    Math.floor(Math.random() * (window.innerHeight - r - 1) + r + 1);

  return { drawCircle, drawCycle, drawRect, randomX, randomY };
};
export const genSize = (max: number, min: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const genColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const detectCollisionX = (
  circle: Circle,
  canvas: HTMLCanvasElement,
  action = (c: Circle) => {
    c.changeSpeed(-c.dx, c.dy);
    c.changeColor(genColor());
  }
) => {
  if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
    action(circle);
  }
};
export const detectCollisionY = (
  circle: Circle,
  canvas: HTMLCanvasElement,
  action = (c: Circle) => {
    c.changeSpeed(c.dx, -c.dy);
    c.changeColor(genColor());
  }
) => {
  if (
    circle.y + circle.radius > canvas.height ||
    circle.y - circle.radius < 0
  ) {
    action(circle);
  }
};
export const detectCollisionWithCircles = (circles: Circle[]) => {
  for (let i = 0; i < circles.length - 1; i++) {
    for (let j = 0; j < circles.length; j++) {
      if (detectCollisionWithCircle(circles[i], circles[j])) {
        break;
      }
    }
  }
};
export const detectCollisionWithCircle = (
  circle1: Circle,
  circle2: Circle,
  action = (c1: Circle, c2: Circle) => {
    c1.changeSpeed(0, 0);
    c2.changeSpeed(0, 0);
  }
): boolean => {
  const distance = Math.sqrt(
    Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2)
  );
  if (circle1.Id !== circle2.Id && distance < circle1.radius + circle2.radius) {
    action(circle1, circle2);
    return true;
  }
  return false;
};

export class Circle {
  constructor(
    private id: number,
    public x: number,
    public y: number,
    public radius: number,
    public dx: number,
    public dy: number,
    public color: string,
    public style: string = "stroke"
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.style = style;
    this.id = id;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
  changeSpeed(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }
  changeColor(color: string) {
    this.color = color;
  }
  changeLocation(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  get Id(): string {
    return `${this.id}`.padEnd(3, "0");
  }
}
