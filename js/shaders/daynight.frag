#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler; // PIXI's default name
uniform float timeOfDay; // A float from 0.0 (midnight) to 1.0 (end of day)

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);

  // Color filters for different times of day
  vec3 morningColor = vec3(1.0, 0.85, 0.7); // Orange tint
  vec3 dayColor = vec3(1.0, 1.0, 1.0);      // No tint
  vec3 eveningColor = vec3(0.9, 0.6, 0.4);  // Dark orange tint
  // vec3 nightColor = vec3(0.2, 0.2, 0.5);    // Dark blue tint
  vec3 nightColor = vec3(0.0, 0.0, 0.33);    // really Dark blue tint

  vec3 tint;

  if (timeOfDay < 0.25) {
    tint = mix(nightColor, morningColor, timeOfDay * 4.0);
  } else if (timeOfDay < 0.5) {
    tint = mix(morningColor, dayColor, (timeOfDay - 0.25) * 4.0);
  } else if (timeOfDay < 0.75) {
    tint = mix(dayColor, eveningColor, (timeOfDay - 0.5) * 4.0);
  } else {
    tint = mix(eveningColor, nightColor, (timeOfDay - 0.75) * 4.0);
  }

  gl_FragColor = vec4(color.rgb * tint, color.a);
}
