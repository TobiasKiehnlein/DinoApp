//#extension GL_OES_standard_derivatives : enable
//
//varying vec2 vUv;
//uniform float thickness;
//uniform vec3 fill;
//uniform vec3 stroke;
//
//float edgeFactor(vec2 p){
//    vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;
//    return min(grid.x, grid.y);
//}
//
//void main() {
//vec3 color = fill;
//vec3 edgeColor = stroke;
//    float a = clamp(edgeFactor(vUv), 0., 1.);
//
//    vec3 c = mix(edgeColor, color, a);
//
//    gl_FragColor = vec4(c, 1.0);
//}

varying mediump vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 n = normalize(vNormal);

    // Compute curvature
    vec3 dx = dFdx(n);
    vec3 dy = dFdy(n);
    vec3 xneg = n - dx;
    vec3 xpos = n + dx;
    vec3 yneg = n - dy;
    vec3 ypos = n + dy;
    float depth = length(vPosition);
    float curvature = (cross(xneg, xpos).y - cross(yneg, ypos).x) * 4.0 / depth;

    // Compute surface properties
    vec3 light = vec3(0.0);
    vec3 ambient = vec3(curvature + 0.5);
    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);
    float shininess = 0.0;

    // Compute final color
    float cosAngle = dot(n, light);
    gl_FragColor = vec4(ambient +
    diffuse * max(0.0, cosAngle) +
    specular * pow(max(0.0, cosAngle), shininess), 1);
    gl_FragColor = vec4((vPosition + vNormal*10.0) /  115.0, 1);
}
