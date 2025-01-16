#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler; // Default PIXI texture

// Light source uniforms
uniform vec2 lightPos;     // Light position (normalized 0.0–1.0)
uniform float lightRadius; // Light radius
uniform float intensity;   // Light intensity (brightness)

// Global darkness tint
uniform vec3 ambientColor; // Default ambient darkness

void main() {
    // Sample the current pixel color
    vec4 color = texture2D(uSampler, vTextureCoord);

    // Calculate distance to the light source
    float dist = distance(vTextureCoord, lightPos);

    // Light falloff based on radius
    float attenuation = 1.0 - smoothstep(0.0, lightRadius, dist);

    // Final light color
    vec3 lightEffect = mix(ambientColor, vec3(1.0, 1.0, 1.0), attenuation * intensity);

    // Apply light tint
    gl_FragColor = vec4(color.rgb * lightEffect, color.a);
}
