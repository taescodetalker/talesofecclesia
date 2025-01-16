precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// Uniforms for wave animation
uniform float time;
uniform float amplitude; // Height of the wave
uniform float frequency; // Wave frequency
uniform float speed;     // Speed of wave movement

void main(void) {
    // Calculate wave distortion
    float wave = sin(vTextureCoord.y * frequency + time * speed) * amplitude;

    // Offset the texture coordinates based on the wave distortion
    vec2 distortedCoord = vec2(vTextureCoord.x + wave, vTextureCoord.y);

    // Sample the texture
    vec4 color = texture2D(uSampler, distortedCoord);

    gl_FragColor = color;
}
