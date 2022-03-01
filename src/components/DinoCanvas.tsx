import React, { FC, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, OrbitControls, useProgress } from '@react-three/drei';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import './DinoCanvas.scss';
import DinoModel from './DinoModel';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Loader() {
	const { progress } = useProgress();
	return <Html center>{ progress } % loaded</Html>;
}

function Dino(props: JSX.IntrinsicElements['mesh']) {
	// const geom = useLoader(GLTFLoader, 'dino.glb');
	const ref = useRef<THREE.Mesh>(null!);
	const [ hovered, hover ] = useState(false);
	// useFrame((state, delta) => (ref.current.rotation.y += 0.005));
	return (
		<mesh
			{ ...props }
			ref={ ref }
			scale={ 0.08 }
			onPointerOver={ (event) => hover(true) }
			onPointerOut={ (event) => hover(false) }>
			<DinoModel/>
			{/*<primitive object={ geom }/>*/ }
			{/*<meshPhongMaterial color='green' opacity={ 0.1 } transparent/>*/ }
		</mesh>
	);
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

const Bloom: FC<{ active?: boolean }> = ({ children, active }) => {
	const { gl, camera, size } = useThree();
	const [ scene, setScene ] = useState();
	const composer = useRef<any>(null);
	useEffect(() => void scene && composer.current?.setSize(size.width, size.height), [ size ]);
	useFrame(() => scene && composer.current?.render(), 1);
	return (
		<>
			{/*@ts-ignore*/ }
			<scene ref={ setScene }>{ children }</scene>
			<effectComposer ref={ composer } args={ [ gl ] }>
				<renderPass attachArray='passes' scene={ scene } camera={ camera }/>
				{/*@ts-ignore*/ }
				<unrealBloomPass attachArray='passes' args={ [ undefined, .5, .5, 0 ] }/>
			</effectComposer>
		</>
	);
};

const DinoCanvasContent: React.FC = () => {
	
	useThree(({ camera, scene }) => {
		camera.rotation.set(deg2rad(-35), 0, 0);
		camera.position.set(0, 2, 5);
		// scene.background = null;
	});
	
	return (
		<>
			<pointLight position={ [ 10, 10, 10 ] } intensity={ .1 }/>
			<pointLight position={ [ -10, 10, -10 ] } intensity={ .1 }/>
			<Dino position={ [ 0, -2, 0 ] }/>
		</>
	);
};

const DinoCanvas: React.FC = () => {
	
	return (
		<Canvas style={ { height: 'min(40vh, 500px)' } } linear id={ 'dino-canvas' }>
			<Suspense fallback={ <Loader/> }>
				<Bloom>
					<DinoCanvasContent/>
				</Bloom>
				<OrbitControls autoRotate enableZoom={ false } enablePan={ false }/>
			</Suspense>
		</Canvas>
	);
};

export default DinoCanvas;
