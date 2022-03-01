varying vec2 v_uv;
varying vec4 v_pos;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_pos = gl_Position;
}
