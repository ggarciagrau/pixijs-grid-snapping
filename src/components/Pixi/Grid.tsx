import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

type Props = {
  color: number;
  size: number;
};

export const Grid = ({ color, size }: Props) => {
  return (
    <Graphics
      draw={(graphics: PixiGraphics) => {
        graphics.clear();
        for (let i = 0; i < window.innerWidth; i += size) {
          for (let j = 0; j < window.innerHeight; j += size) {
            graphics.lineStyle(1, color, 0.5);
            graphics.drawRect(i, j, size, size);
          }
        }
      }}
    />
  );
};
