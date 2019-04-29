#version 300 es

uniform mat4 u_ViewProj;
uniform float u_Time;
uniform mat4 u_Model;
uniform bool u_NoisyEdge;

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

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

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

float generateHeight(float x, float y) {
  // noise two - elevation
    float total = 0.0;
    float persistence = 0.5f;
    float octaves = 10.0;

    for (float i = 0.0; i < octaves; i = i + 1.0) {
        float freq = pow(2.0f, i);
        float amp = pow(persistence, i);
        total += (1.0 / freq) * interpNoise2D(x * freq, y * freq);
    }
    return total;
}

void main()
{
    fs_Col = vs_Col;
    mat4 transformation;
    vec4 modelposition;
    vec4 transformedPos;
    if (u_NoisyEdge) {
      float noise = 0.02 * random(vs_Pos.xy);
      transformation = mat4(vs_Transform1, vs_Transform2, vs_Transform3,
        vs_Transform4);
      modelposition = vec4(vs_Pos.x + noise, vs_Pos.y, vs_Pos.z + noise, 1.0);
      modelposition = u_Model * modelposition;
      transformedPos = transformation * modelposition;
      transformedPos += vec4(-0.05 * random1(transformedPos.xz, transformedPos.yz), 0,
      0.1 * random1(transformedPos.xz, transformedPos.xy), 0.0);
      fs_Pos = transformedPos;
    } else {
      transformation = mat4(vs_Transform1, vs_Transform2, vs_Transform3,
        vs_Transform4);
      modelposition = vs_Pos;
      modelposition = u_Model * modelposition;
      transformedPos = transformation * modelposition;
      fs_Pos = vs_Pos;
    }

    fs_LightVec = lightPos - transformedPos;
    gl_Position = u_ViewProj * transformedPos;
}
