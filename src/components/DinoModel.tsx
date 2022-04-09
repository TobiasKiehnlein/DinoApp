import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { BufferAttribute, Color, DoubleSide, Mesh, MeshStandardMaterial, ShaderMaterial } from 'three';
import { loadShader } from '../loadShader';
import { useFrame } from '@react-three/fiber';


const mat = new MeshStandardMaterial();
mat.emissive = new Color('#341555');

export default function DinoModel({ ...props }) {
	const [ mat, setMat ] = useState<ShaderMaterial>();
	const mesh = useRef<Mesh>(null);
	useEffect(() => {
		(async () => {
			const vertexShader = await loadShader('vertex.glsl');
			const fragmentShader = await loadShader('fragment.glsl');
			setMat(new ShaderMaterial({
				fragmentShader: fragmentShader,
				vertexShader: vertexShader,
				extensions: {
					// needed for anti-alias smoothstep, aastep()
					derivatives: true
				},
				transparent: true,
				side: DoubleSide,
				uniforms: {
					time: { value: 0 },
					fill: { value: new Color('red') },
					stroke: { value: new Color('green') },
					dualStroke: { value: false },
					seeThrough: { value: true },
					insideAltColor: { value: true },
					thickness: { value: 10 },
					secondThickness: { value: .05 },
					dashEnabled: { value: false },
					dashRepeats: { value: 2.0 },
					dashOverlap: { value: false },
					dashLength: { value: 0.55 },
					dashAnimate: { value: false },
					squeeze: { value: false },
					squeezeMin: { value: 0.1 },
					squeezeMax: { value: 1.0 }
				}
			}));
		})();
	}, []);
	
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		if (mesh.current && mesh.current.material) {
			const mat = mesh.current.material as any;
			mat.uniforms.time.value = time;
		}
	});
	const group = useRef();
	// @ts-ignore
	const { nodes, materials } = useGLTF('/dino.glb');
	const [ geometry, setGeometry ] = useState<any>();
	
	useEffect(() => {
		if (!nodes?.dino_blender?.geometry) {
			return;
		}
		const geom = nodes.dino_blender.geometry;
		console.log('Updating Barycentric Coordinates');
		setGeometry(geom);
	}, [ nodes ]);
	return (
		<>
			{
				mat && geometry ?
					<group ref={ group } { ...props } dispose={ null }>
						<mesh geometry={ nodes.dino_blender.geometry } material={ mat } ref={ mesh }/>
					</group>
					: <></>
			}
		</>
	);
}

useGLTF.preload('/dino.glb');

