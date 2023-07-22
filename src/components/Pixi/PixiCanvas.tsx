import { Stage } from "@pixi/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PixiCanvas = ({ children }: Props) => {
  return (
    <Stage options={{ backgroundColor: 0xfcba03, width: 800, height: 800 }}>
      {children}
    </Stage>
  );
};
