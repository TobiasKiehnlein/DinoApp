import React, { FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Html, OrbitControls, useProgress } from '@react-three/drei';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import './DinoCanvas.scss'
import { Euler } from 'three';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Loader() {
	const { progress } = useProgress();
	return <Html center>{ progress } % loaded</Html>;
}

function Dino(props: JSX.IntrinsicElements['mesh']) {
	const geom = useLoader(FBXLoader, 'dino.fbx');
	const ref = useRef<THREE.Mesh>(null!);
	const [ hovered, hover ] = useState(false);
	// useFrame((state, delta) => (ref.current.rotation.y += 0.005));
	return (
		<mesh
			{ ...props }
			ref={ ref }
			scale={ 0.0008 }
			onPointerOver={ (event) => hover(true) }
			onPointerOut={ (event) => hover(false) }>
			<primitive object={ geom } />
			{/*<boxGeometry args={ [ 1, 1, 1 ] }/>*/ }
			<meshPhongMaterial color='green' opacity={ 0.1 } transparent/>
		</mesh>
	);
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

const Bloom: FC = ({ children }) => {
	const { gl, camera, size } = useThree();
	const [ scene, setScene ] = useState();
	const composer = useRef<ReactNode>(null);
	// @ts-ignore
	useEffect(() => void scene && composer.current?.setSize(size.width, size.height), [ size ]);
	// @ts-ignore
	useFrame(() => scene && composer.current?.render(), 1);
	return (
		<>
			{/*@ts-ignore*/ }
			<scene ref={ setScene }>{ children }</scene>
			<effectComposer ref={ composer } args={ [ gl ] }>
				<renderPass attachArray='passes' scene={ scene } camera={ camera }/>
				{/*@ts-ignore*/ }
				<unrealBloomPass attachArray='passes' args={ [ undefined, 1.5, 1, 0 ] }/>
			</effectComposer>
		</>
	);
};

const DinoCanvasContent: React.FC = () => {
	
	useThree(({ camera }) => {
		camera.rotation.set(deg2rad(-35), 0, 0);
		camera.position.set(0, 2, 5);
	});
	
	return (
		<>
			<ambientLight/>
			<pointLight position={ [ 10, 10, 10 ] } />
			{/*<pointLight position={ [ 0, 0, 0 ] } color={ 'red' } intensity={ 10 }/>*/}
			{/*<mesh position={ [ 0, 0, 0 ] }>*/}
			{/*	<boxGeometry args={ [ .1, .1, .1 ] }/>*/}
			{/*	<meshStandardMaterial color={ 'hotpink' }/>*/}
			{/*</mesh>*/}
			<Dino position={ [ 0, -2, 0 ] }/>
		</>
	);
};

const DinoCanvas: React.FC = () => {
	
	return (
		<Canvas style={ { height: 'min(40vh, 500px)' } } linear id={'dino-canvas'}>
			<Suspense fallback={ <Loader/> }>
				{/*<Bloom>*/}
					<DinoCanvasContent/>
				{/*</Bloom>*/}
				<OrbitControls autoRotate enableZoom={false} enablePan={false}/>
			</Suspense>
		</Canvas>
	);
};

export default DinoCanvas;
