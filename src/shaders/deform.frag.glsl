#version 300 es
precision highp float;

uniform vec4 u_Color; // The color with which to render this instance of geometry.
uniform int u_Time;

// These are the interpolated values out of the rasterizer, so you can't know
// their specific values without knowing the vertices that contributed to them
in vec4 fs_Nor;
in vec4 fs_LightVec;
in vec4 fs_Col;

out vec4 out_Col; // This is the final output color that you will see on your
                  // screen for the pixel that is currently being processed.

void main()
{
        float diffuseTerm = dot(normalize(fs_Nor), normalize(fs_LightVec));
        //diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);

        vec3 a = vec3(0.8, 0.5, 0.4);
        vec3 b = vec3(0.2, 0.4, 0.2);
        vec3 c = vec3(2.0, 1.0, 1.0);
        vec3 d = vec3(0.00, 0.25, 0.25);

        out_Col = vec4(a + b * cos(6.28318 * (c * diffuseTerm + d) * cos(float(u_Time) * 0.007))  * fs_Nor.xyz , 1);
}
