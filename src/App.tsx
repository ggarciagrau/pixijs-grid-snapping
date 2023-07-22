import { PixiCanvas } from "./components/Pixi/PixiCanvas";
import { Grid } from "./components/Pixi/Grid";
import { Square } from "./components/Pixi/Square";
import { DoubleSquare } from "./components/Pixi/DoubleSquare";
import "./App.css";

function App() {
  const gridSize = 50;

  return (
    <>
      <PixiCanvas>
        {/* <Square {...{ gridSize }} /> */}
        <DoubleSquare {...{ gridSize }} />
        <Grid color={0xf20f34} size={gridSize} />
      </PixiCanvas>
    </>
  );
}

export default App;
