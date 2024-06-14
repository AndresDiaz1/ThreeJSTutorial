varying vec2 vUv;
uniform float uTime;
uniform sampler2D uPerlinTexture;

#include ../includes/rotate2D.glsl


void main (){
    vec3 newPosition= position;
    float twistPerlin = texture(
        uPerlinTexture,
        vec2(0.5,uv.y*0.2-uTime*0.005)
        ).r;


    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime*0.01)).r -0.5,
        texture(uPerlinTexture, vec2(0.75, uTime*0.01)).r -0.5
        );

    windOffset *= pow(uv.y, 2.) *10.0;

    newPosition.xz += windOffset;
    float angle = twistPerlin*10.;
    newPosition.xz = rotate2D(newPosition.xz,angle);
    gl_Position= projectionMatrix * modelViewMatrix * vec4(newPosition,1.);
    vUv = uv;
}