import { useState } from "react";
import Line from "./Line";
import { Canvas } from "@react-three/fiber";
import Coordinates from "./coordinates";

function App() {
  const [finish, setFinish] = useState(false);
  const [cord, setcord] = useState([]);

  const onDotsUpdate = (updatedDots) => {
    setcord(updatedDots);
  };

  const onComplete = () => {
    setFinish(!finish);
  };

  return (
    <div style={{ width: "100%", height: "90vh", backgroundColor: '#fff' }}>
      <Canvas style={{ width: "100%", height: "100%" }}>
        <Line isCompleted={finish} onDotsUpdate={onDotsUpdate} />
      </Canvas>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "18px",
          marginTop: "8px",
        }}
      >
        <button onClick={onComplete}>
          {finish ? "2D View" : "3D View"}
        </button>
      </div>
      <Coordinates cord={cord} />
    </div>
  );
}

export default App;
