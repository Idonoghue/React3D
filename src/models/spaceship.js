import React, { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, extend, useThree } from "react-three-fiber"
import * as THREE from "three";
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { MeshBasicMaterial, BoxBufferGeometry, ClampToEdgeWrapping } from "three";
import { useSpring, a } from "react-spring/three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


const SpaceShip = () => {
    const [model, setModel] = useState();
    let material;
    useEffect(() => {
    model || new OBJLoader().load('/SmallSpaceFighter.obj', setModel, 
        (xhr) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ), 
        (error) => console.log("error!", error));
    console.log(model);
    })

    
    model && model.traverse((child) => {
						if ( child.isMesh ) {
                            child.material.forEach(element => {
                                element.color = new THREE.Color( 'cadetblue' );
                            });
                            material = child.material;
                        }
					});
    return (
        model ? /*<primitive object={model} castShadow />*/
            <group position={[0, 0, 0]}>
                <mesh material={material}receiveShadow castShadow>
                    <bufferGeometry attach="geometry" {...model.children[0].geometry} />
                </mesh>    
            </group> : null
    )
}

export default SpaceShip;