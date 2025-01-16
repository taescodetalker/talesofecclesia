precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// Animation uniforms
uniform float time;         // Controls time progression
uniform float amplitude;    // Max bending distance at the top
uniform float frequency;    // Controls oscillation speed
uniform float stiffness;    // Controls how far the bending affects the sprite

void main(void) {
    // Invert vertical progress so 0.0 = bottom, 1.0 = top
    float verticalProgress = 1.0 - vTextureCoord.y;

    // Compute bending based on vertical position and time
    // The top bends more, and the bottom remains solid (fixed)
    float bend = sin(time * frequency) * amplitude * pow(verticalProgress, stiffness);

    // Offset the X coordinate based on the bend
    vec2 distortedCoord = vec2(vTextureCoord.x + bend, vTextureCoord.y);

    // Sample the texture
    vec4 color = texture2D(uSampler, distortedCoord);

    gl_FragColor = color;
}
