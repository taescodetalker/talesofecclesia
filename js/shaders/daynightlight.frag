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

uniform vec3 lightColor[MAX_LIGHTS];

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
    vec3 light = ambientTint; // Start with ambient or day-night tint instead of 0
    if (numLights > 0) {

        for (int i = 0; i < MAX_LIGHTS; i++) {
            if (i >= numLights) break;

            // Extract light position from the flat array
            vec2 lightPosNDC = vec2(lightPos[i * 2], lightPos[i * 2 + 1]);

            // Calculate distance to the light
            float dist = distance(vTextureCoord, lightPosNDC);

            // Calculate light attenuation based on distance and radius
            float attenuation = 1.0 - smoothstep(0.0, lightRadius[i], dist);

            // Smooth blending using `mix`
            vec3 lightEffect = mix(light, lightColor[i], attenuation * intensity[i]);
            light = lightEffect;
        }
    } 
    else {
        // When no lights are active, default to ambient tint blended with base color
        light *= baseColor.rgb;
    }
    light = baseColor.rgb * light;

    // --- Final Output ---
    gl_FragColor = vec4(light, baseColor.a);
}
