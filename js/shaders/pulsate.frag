precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    color.rgb += sin(time) * 0.5; // Pulsating color effect
    gl_FragColor = color;
}
