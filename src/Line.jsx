import React, { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Shape, ExtrudeGeometry, Vector3, Raycaster } from "three";
import { useDrag } from "react-use-gesture";

function Line({ isCompleted, onDotsUpdate }) {
  const drawingLine = useRef();
  const ref = useRef();
  const sGeometry = useRef();
  const { size, viewport } = useThree();
  const [points, setPoints] = useState([]);
  const aspect = size.width / viewport.width;
  const [cg, setCg] = useState(null);
  const { camera, scene } = useThree();
  const createDesign = () => {
  const shape = new Shape();
  shape.moveTo(...points.shift());
  points.forEach(({ x, y }) => shape.lineTo(x, y));
  const geometry = new ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
  sGeometry.current = geometry;
  setCg(geometry);
  };
  useEffect(() => {
    points.length && onDotsUpdate(points);
    isCompleted && createDesign();
  }, [points, isCompleted]);
  const handleMouseDown = (event) => {
    if (!isCompleted) {
      const { clientX, clientY } = event;
      const mouse = { x: (clientX / window.innerWidth) * 2 - 1, y: -(clientY / window.innerHeight) * 2 + 1 };
      const raycaster = new Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      intersects.length && setPoints((prevPoints) => [...prevPoints, intersects[0].point.clone()]);
    }
  };
  const [shapePosition, setShapePosition] = useState([0, 0, 0]);
  useFrame(() => {
    if (drawingLine.current && points.length > 0) drawingLine.current.geometry.setFromPoints(points.map(({ x, y }) => new Vector3(x, y, 0)));
  });
  const bdrag = useDrag(({ offset: [x, y] }) => setShapePosition([x / aspect, -(y / aspect), 0]), { pointerEvents: true });
  return (
    <>
      <mesh onPointerDown={handleMouseDown}>
        <planeGeometry attach="geometry" args={[window.innerWidth, window.innerHeight]} />
      </mesh>
      {points.length > 0 && !isCompleted ? (
        <line ref={drawingLine}>
          <lineBasicMaterial attach="material" color="black" linewidth={20} />
        </line>
      ) : null}
      {cg && isCompleted && (
        <mesh {...bdrag()} ref={ref} geometry={sGeometry.current} color="red" position={shapePosition}>
          <meshStandardMaterial color="purple" roughness={1} metalness={-1} />
        </mesh>
      )}
      {isCompleted && (
        <>
          <ambientLightProbe intensity={0.2} />
          <pointLight position={[2, 4, 6]} />
        </>
      )}
    </>
  );
}
export default Line;
