import { useRef, useEffect } from "react";
import "./canvas.scss";
import {
  canvasFunctions,
  Circle,
  detectCollisionWithCircles,
  detectCollisionX,
  detectCollisionY,
  genColor,
  genSize,
} from "../utils/helpers";
const Canvas = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const circles: Circle[] = [];
    if (canvas.current) {
      const ctx = canvas.current?.getContext("2d");
      const { drawCycle, randomX, randomY } = canvasFunctions(ctx);
      const date = new Date();
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;
      const MINSIZE = 7;
      const MAXSIZE = date.getDate() * 2 + MINSIZE + 1;
      const MINSPEED = 2;
      const MAXSPEED = 5;
      const STYLE = date.getDay() % 0 ? "fill" : "stroke";
      const N = date.getDay() + 1;

      for (let i = 0; i < N; i++) {
        const radius = genSize(MAXSIZE, MINSIZE);
        const c = new Circle(
          i + 1,
          randomX(radius),
          randomY(radius),
          radius,
          genSize(MAXSPEED, MINSPEED),
          genSize(MAXSPEED, MINSPEED),
          genColor(),
          STYLE
        );
        circles.push(c);
      }

      const animate = () => {
        ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
        detectCollisionWithCircles(circles);
        for (const c of circles) {
          detectCollisionX(c, canvas?.current as HTMLCanvasElement);
          detectCollisionY(c, canvas?.current as HTMLCanvasElement);
          c.update();
          drawCycle(c);
        }
        requestAnimationFrame(animate);
      };

      document.addEventListener("click", () => {
        for (const c of circles) {
          c.changeSpeed(
            genSize(MAXSPEED, MINSPEED),
            genSize(MAXSPEED, MINSPEED)
          );
          c.changeLocation(randomX(c.radius), randomY(c.radius));
        }
      });

      animate();
    }
  }, []);
  return <canvas id="canvas" className="canvas" ref={canvas}></canvas>;
};
export default Canvas;
