import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Sprite, useApp } from "@pixi/react";
import { FederatedPointerEvent, Texture, Container } from "pixi.js";

type Props = {
  gridSize: number;
};

type Coords = {
  x: number;
  y: number;
};

const dimensions = {
  width: 30,
  height: 30,
};

const handleSnappedMove = (
  data: FederatedPointerEvent | null,
  stage: Container,
  gridSize: number,
  setCoords: Dispatch<SetStateAction<Coords>>
) => {
  if (data) {
    const newPosition = data.getLocalPosition(stage);

    const halfGridSize = gridSize / 2;

    const offset = dimensions.width;

    const snappedX =
      Math.round((newPosition.x - offset) / gridSize) * gridSize + halfGridSize;
    const snappedY =
      Math.round((newPosition.y - offset) / gridSize) * gridSize + halfGridSize;

    setCoords({ x: snappedX, y: snappedY });
  }
};

const handleFreeMove = (
  data: FederatedPointerEvent | null,
  stage: Container,
  setCoords: Dispatch<SetStateAction<Coords>>
) => {
  if (data) {
    const newPosition = data.getLocalPosition(stage);

    setCoords(newPosition);
  }
};

export const DoubleSquare = ({ gridSize }: Props) => {
  const app = useApp();
  const [snappedCoords, setSnappedCoords] = useState<Coords>({
    x: 0 + gridSize / 2,
    y: 0 + gridSize / 2,
  });

  const [freeCoords, setFreeCords] = useState<Coords>({
    x: 0 + gridSize / 2,
    y: 0 + gridSize / 2,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [data, setData] = useState<FederatedPointerEvent | null>(null);

  const handleSnappedMoveCallback = useCallback(
    () => handleSnappedMove(data, app.stage, gridSize, setSnappedCoords),
    [data, app.stage, gridSize, setSnappedCoords, dimensions]
  );

  const handleFreeMoveCallback = useCallback(
    () => handleFreeMove(data, app.stage, setFreeCords),
    [data, app.stage, setFreeCords, dimensions]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleSnappedMoveCallback);
      window.addEventListener("mousemove", handleFreeMoveCallback);

      return () => {
        window.removeEventListener("mousemove", handleSnappedMoveCallback);
        window.removeEventListener("mousemove", handleFreeMoveCallback);
      };
    }
  }, [isDragging, data, app.stage]);

  const onDragStart = (event: FederatedPointerEvent) => {
    setIsDragging(true);
    setData(event);
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setData(null);
  };

  return (
    <>
      <Sprite
        texture={Texture.WHITE}
        tint={0x0f57f2}
        width={dimensions.width}
        height={dimensions.height}
        interactive
        anchor={[0.5, 0.5]}
        pointerdown={onDragStart}
        pointerup={onDragEnd}
        pointerupoutside={onDragEnd}
        x={snappedCoords.x}
        y={snappedCoords.y}
      />

      <Sprite
        texture={Texture.WHITE}
        tint={0x3aeb34}
        width={dimensions.width}
        height={dimensions.height}
        interactive
        anchor={[0.5, 0.5]}
        pointerdown={onDragStart}
        pointerup={onDragEnd}
        pointerupoutside={onDragEnd}
        x={freeCoords.x}
        y={freeCoords.y}
      />
    </>
  );
};
