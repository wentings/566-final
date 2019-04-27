#version 300 es

uniform mat4 u_ViewProj;
uniform float u_Time;

uniform mat3 u_CameraAxes; // Used for rendering particles as billboards (quads that are always looking at the camera)
// gl_Position = center + vs_Pos.x * camRight + vs_Pos.y * camUp;

in vec4 vs_Pos; // Non-instanced; each particle is the same quad drawn in a different place
in vec4 vs_Nor; // Non-instanced, and presently unused
in vec4 vs_Col; // An instanced rendering attribute; each particle instance has a different color
in vec3 vs_Translate; // Another instance rendering attribute used to position each quad instance in the scene
in vec2 vs_UV; // Non-instanced, and presently unused in main(). Feel free to use it for your meshes.

in vec4 vs_Transform1;
in vec4 vs_Transform2;
in vec4 vs_Transform3;
in vec4 vs_Transform4;

out vec4 fs_Col;
out vec4 fs_Pos;
out vec4 fs_Nor;
out vec4 fs_LightVec;

const vec4 lightPos = vec4(0, 5, -5, 1);

float random1( vec2 p , vec2 seed) {
  return fract(sin(dot(p + seed, vec2(127.1, 311.7))) * 43758.5453);
}

float interpNoise2D(float x, float y) {
    float intX = floor(x);
    float fractX = fract(x);
    float intY = floor(y);
    float fractY = fract(y);

    float v1 = random1(vec2(intX, intY), vec2(311.7, 127.1));
    float v2 = random1(vec2(intX + 1.0f, intY), vec2(311.7, 127.1));
    float v3 = random1(vec2(intX, intY + 1.0f), vec2(311.7, 127.1));
    float v4 = random1(vec2(intX + 1.0, intY + 1.0), vec2(311.7, 127.1));

    float i1 = mix(v1, v2, fractX);
    float i2 = mix(v3, v4, fractX);

    return mix(i1, i2, fractY);
}

void main()
{
    fs_Col = vs_Col;
    float noise = interpNoise2D(fs_Pos.x, fs_Pos.y);
    fs_Pos = vs_Pos + vec4(2.0, 2.0, 0, 0);

    mat4 transformation = mat4(vs_Transform1, vs_Transform2, vs_Transform3,
      vs_Transform4);
    fs_LightVec = lightPos;
    vec4 transformedPos = transformation * fs_Pos;
    gl_Position = u_ViewProj * transformedPos;
}
