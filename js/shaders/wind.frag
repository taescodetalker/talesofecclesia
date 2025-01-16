precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// Uniforms for animation
uniform float time;         // Animation time
uniform float amplitude;    // Wave height (distortion intensity)
uniform float frequency;    // Wave frequency (size of ripples)
uniform float speed;        // Movement speed of the waves

void main(void) {
    // Calculate distortion based on X-position and time
    float distortion = sin((vTextureCoord.x * frequency) + (time * speed)) * amplitude;

    // Offset the Y-coordinate for the wind effect
    vec2 distortedCoord = vec2(vTextureCoord.x, vTextureCoord.y + distortion);

    // Sample the texture at the distorted coordinates
    vec4 color = texture2D(uSampler, distortedCoord);

    gl_FragColor = color;
}
