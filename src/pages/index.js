import React, { useState, useRef } from "react"
import { Canvas, useFrame, extend, useThree } from "react-three-fiber"
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { MeshBasicMaterial, BoxBufferGeometry } from "three";
import { useSpring, a } from "react-spring/three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

const Box = () => {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const props = useSpring({
        scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
        color: hovered ? "hotpink" : "grey"
    })
    // useFrame(() => {
    //     meshRef.current.rotation.y += 0.01;
    // })

    return (
        <a.mesh 
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setActive(!active)}
            scale={props.scale}
        >
            <ambientLight />
            <spotLight position={[0, 5, 10]}/>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <a.meshPhysicalMaterial attach="material" color={props.color}/>
        </a.mesh>
    )
}
export default () => {
    // const classes = makeStyles(useStyles);
return (
    <Canvas>
        <Box />
        <Controls />
    </Canvas>
)
}
