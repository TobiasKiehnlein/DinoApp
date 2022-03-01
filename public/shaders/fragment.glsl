varying vec2 v_uv;
varying vec4 v_pos;
uniform vec2 u_mouse;
uniform vec3 u_color;
uniform float u_time;

void main() {
//    gl_FragColor = vec4(1.0, 0, 0, 1.0);
    gl_FragColor = vec4(1.0, 0.0, sin(u_time) + 0.5, 1.0).rgba;

//    gl_FragColor = vec4(step(.5, v_pos.xyz), 1.0);

}
