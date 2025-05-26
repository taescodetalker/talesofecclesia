#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler; // The base texture (map)

// --- Day-Night Uniforms ---
uniform float timeOfDay;          // Day-night cycle, 0.0 (midnight) to 1.0 (next midnight)
uniform vec3 morningColor;        // Morning tint
uniform vec3 dayColor;            // Day tint
uniform vec3 eveningColor;        // Evening tint
uniform vec3 nightColor;          // Night tint

// --- Light Uniforms ---
const int MAX_LIGHTS = 100;        // Maximum number of lights
uniform float lightPos[MAX_LIGHTS * 2]; // Flattened array of light positions (vec2)
uniform float lightRadius[MAX_LIGHTS];  // Radii of lights
uniform float intensity[MAX_LIGHTS];    // Intensity of lights
uniform int numLights;                  // Number of active lights

// --- Ambient Darkness ---
uniform vec3 ambientColor;  // Ambient darkness (used only for caves)
uniform bool useAmbient;    // Flag to toggle ambientColor

void main() {
    // Sample the texture color
    vec4 baseColor = texture2D(uSampler, vTextureCoord);

    // --- Day-Night Tint ---
    vec3 dayNightTint;
    if (timeOfDay < 0.25) {
        dayNightTint = mix(nightColor, morningColor, timeOfDay * 4.0);
    } else if (timeOfDay < 0.5) {
        dayNightTint = mix(morningColor, dayColor, (timeOfDay - 0.25) * 4.0);
    } else if (timeOfDay < 0.75) {
        dayNightTint = mix(dayColor, eveningColor, (timeOfDay - 0.5) * 4.0);
    } else {
        dayNightTint = mix(eveningColor, nightColor, (timeOfDay - 0.75) * 4.0);
    }

    // Determine the base ambient tint
    vec3 ambientTint = useAmbient ? ambientColor : dayNightTint;

    // --- Light Effect ---
    vec3 lightColor = ambientTint; // Start with ambient or day-night tint
    if (numLights > 0) {
        for (int i = 0; i < MAX_LIGHTS; i++) {
            if (i >= numLights) break;

            // Extract light position from the flat array
            vec2 light = vec2(lightPos[i * 2], lightPos[i * 2 + 1]);

            // Calculate distance to the light
            float dist = distance(vTextureCoord, light);

            // Calculate light attenuation based on distance and radius
            float attenuation = 1.0 - smoothstep(0.0, lightRadius[i], dist);

            // Smooth blending using `mix`
            vec3 lightEffect = mix(lightColor, vec3(1.0, 1.0, 1.0), attenuation * intensity[i]);
            lightColor = lightEffect;
        }

        // Clamp final light contribution to prevent over-brightness
        // lightColor = clamp(lightColor, 0.0, 1.0);
    } 
    else {
        // When no lights are active, default to ambient tint blended with base color
        lightColor *= baseColor.rgb;
    }
    lightColor = baseColor.rgb * lightColor;

    // --- Final Output ---
    gl_FragColor = vec4(lightColor, baseColor.a);
}

// void main() {
//     vec4 baseColor = texture2D(uSampler, vTextureCoord);

//     // --- Day-Night Tint ---
//     vec3 dayNightTint;
//     if (timeOfDay < 0.25) {
//         dayNightTint = mix(nightColor, morningColor, timeOfDay * 4.0);
//     } else if (timeOfDay < 0.5) {
//         dayNightTint = mix(morningColor, dayColor, (timeOfDay - 0.25) * 4.0);
//     } else if (timeOfDay < 0.75) {
//         dayNightTint = mix(dayColor, eveningColor, (timeOfDay - 0.5) * 4.0);
//     } else {
//         dayNightTint = mix(eveningColor, nightColor, (timeOfDay - 0.75) * 4.0);
//     }

//     vec3 ambientTint = useAmbient ? ambientColor : dayNightTint;

//     // --- Light Effect ---
//     vec3 lightColor = vec3(0.0); // Accumulate light contributions

//     for (int i = 0; i < MAX_LIGHTS; i++) {
//         if (i >= numLights) break;

//         // Extract light position
//         vec2 light = vec2(lightPos[i * 2], lightPos[i * 2 + 1]);

//         // Calculate distance and attenuation
//         float dist = distance(vTextureCoord, light);
//         float attenuation = clamp(1.0 - (dist / lightRadius[i]), 0.0, 1.0); // Linear attenuation

//         // Add light contribution
//         lightColor += vec3(1.0, 1.0, 1.0) * attenuation * intensity[i];
//     }

//     // Combine ambient tint, base color, and light effects
//     vec3 finalColor = (ambientTint * baseColor.rgb) + (lightColor * baseColor.rgb);

//     // Clamp final color to prevent over-brightness
//     gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), baseColor.a);
// }
