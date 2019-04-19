import {vec3, mat4, quat} from 'gl-matrix';


export default class Biome {
  position: vec3 = vec3.create();
  direction: vec3 = vec3.create(); // Ensure that orientation is normalized;
  quaternion: quat = quat.create();

  // storing adjacent polygons
  neighbor_polygons: Biomes[] = [];
  border_edges : vec4[] = []; // (x1, y1, x2, y2)
  corners : vec2[] = []; // the vertices


  constructor(pos: vec3, orient: vec3, q: quat) {
    this.position = pos;
    this.direction = orient;
    this.quaternion = q;
  }

  clear() {
    this.position = vec3.fromValues(0, 0, 0);
    this.direction = vec3.fromValues(0, 0, 1);
    this.quaternion = quat.fromValues(0, 0, 1, 0);
  }

  getMatrix() {
    // Translate
        let T: mat4 = mat4.create();
        mat4.fromTranslation(T, this.position);

        // Rotate
        let R: mat4 = mat4.create();
        mat4.fromQuat(R, this.quaternion);

        // Scale, based on depth
        let S: mat4 = mat4.create();
        mat4.fromScaling(S, vec3.fromValues(10, 10, 10));

        // Multiply together
        let transformation: mat4 = mat4.create();
        mat4.multiply(transformation, R, S);
        return mat4.multiply(transformation, T, transformation);
  }

}
