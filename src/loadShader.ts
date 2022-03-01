const shaders: { [key: string]: string } = {};

export const loadShader = async (shaderName: string): Promise<string> => {
	if (!(shaderName in shaders)) {
		const response = await fetch(`/shaders/${ shaderName }`);
		shaders[shaderName] = await response.text();
	}
	return shaders[shaderName];
};
