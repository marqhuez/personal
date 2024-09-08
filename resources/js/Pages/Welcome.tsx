import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Text3D } from "@react-three/drei";
import Roboto from "../assets/roboto.json";

export default function Welcome() {
    const font = Roboto;

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas>
                <directionalLight position={[-1, 2, 4]} />
                <Text font={font} />
            </Canvas>
        </div>
    );
}

function Text({ font }) {
    return (
        <>
            <mesh>
                <Text3D font={font}>
                    coming soon
                    <meshPhongMaterial color="#fafafa" />
                </Text3D>
            </mesh>
        </>
    );
}

function Box() {
    const meshRef = useRef();
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;

    useFrame(
        (_, delta) => (
            (meshRef.current.rotation.x += delta),
            (meshRef.current.rotation.y += delta)
        ),
    );

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[boxWidth, boxHeight, boxDepth]} />
            <meshPhongMaterial color={0x44aa88} />
        </mesh>
    );
}
