import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Color, Mesh, MeshStandardMaterial, ShaderMaterial } from 'three';
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
				vertexShader, fragmentShader, uniforms: {
					u_time: { value: 0.0 }
				}
			}));
		})();
	}, []);
	
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		if (mesh.current && mesh.current.material) {
			const mat = mesh.current.material as any;
			mat.uniforms.u_time.value = time;
		}
	});
	const group = useRef();
	// @ts-ignore
	const { nodes, materials } = useGLTF('/dino.glb');
	return (
		<>
			{
				mat ?
					<group ref={ group } { ...props } dispose={ null }>
						<mesh geometry={ nodes.dino_blender.geometry } material={ mat } ref={ mesh }/>
					</group>
					: <></>
			}
		</>
	);
}

useGLTF.preload('/dino.glb');
