#version 300 es
precision highp float;

#define FLT_MAX 3.402823466e+38
#define FLT_MIN 1.175494351e-38

in vec4 fs_Col;
in vec4 fs_Pos;
in vec4 fs_Nor;
in vec4 fs_LightVec;
in vec2 fs_UV;

out vec4 out_Col;

// https://www.shadertoy.com/view/lsf3WH
vec2 hash( vec2 x )  // replace this by something better
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(2.3-2.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

// vec4 findMinMax() {
//   float min_x = FLT_MAX;
//   float min_z = FLT_MAX;
//   float max_x = FLT_MIN;
//   float max_z = FLT_MIN;
//   if (fs_Pos.x < min_x) {
//     min_x = fs_Pos.x;
//   }
// }


/*
* Main
*/
void main()
{
  // vec2 uv = vec2(fs_Pos.x, fs_Pos.y);
  // float f = 0.0;
  // f = noise( 32.0*uv );
  // uv *= 8.0;
  // mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
	// 	f  = 1.500*noise( uv ); uv = m*uv;
	// 	f += 0.500*noise( uv ); uv = m*uv;
	// 	f += 0.4250*noise( uv ); uv = m*uv;
	// 	f += 0.1625*noise( uv ); uv = m*uv;
  // f = 0.5 + 0.5*f;
  // f *= smoothstep( 0.0, 0.005, 0.001);
 	// out_Col = 2.0 * vec4(f, f, f, 1.0) + 0.8 * fs_Col;

  out_Col = fs_Col;
}
