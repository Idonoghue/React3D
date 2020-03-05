import React, { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, extend, useThree } from "react-three-fiber"
import * as THREE from "three";
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { MeshBasicMaterial, BoxBufferGeometry, ClampToEdgeWrapping } from "three";
import { useSpring, a } from "react-spring/three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import SpaceShip from '../models/spaceship'
import "./styles.css";

// const useStyles = makeStyles({
//   canvas: {
//     height: 100,
//     width: 100,
//     margin: 0,
//     padding: 0,
//   }
// });

// const App = () => (

// );
extend({ OrbitControls })

const Plane = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshPhysicalMaterial attach="material" color="purple"/>
    </mesh>
)

const Controls = () => {
    const { camera, gl } = useThree()
    const orbitRef = useRef()
    useFrame(() => {
        orbitRef.current.update()
    })

    return (
        <orbitControls autoRotate args={[camera, gl.domElement]} ref={orbitRef}/>
    )
}

// const Box = () => {
//     const meshRef = useRef()
//     const [hovered, setHovered] = useState(false);
//     const [active, setActive] = useState(false);
//     const props = useSpring({
//         scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
//         color: hovered ? "hotpink" : "grey"
//     })
//     // useFrame(() => {
//     //     meshRef.current.rotation.y += 0.01;
//     // })

//     return (
//         <a.mesh 
//             ref={meshRef}
//             onPointerOver={() => setHovered(true)}
//             onPointerOut={() => setHovered(false)}
//             onClick={() => setActive(!active)}
//             scale={props.scale}
//             castShadow
//         >
//             <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//             <a.meshPhysicalMaterial attach="material" color={props.color}/>
//         </a.mesh>
//     )
// }
export default () => {
    // const classes = makeStyles(useStyles);
return (
    <Canvas camera={{ position: [0, 0, 5]}}
        onCreated = {({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}>
        <ambientLight />
        <spotLight position={[2, 5, 10]} penumbra={0.5} castShadow/>
        {/* <Box /> */}
        <Controls />
        <Plane />
        <fog attach="fog" args={['#171717', 10, 25]} />
        <SpaceShip />
    </Canvas>
)
}
