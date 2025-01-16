#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler; // Texture
uniform vec3 caveTint;     // Dark tint for the cave

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    gl_FragColor = vec4(color.rgb * caveTint, color.a);
}
