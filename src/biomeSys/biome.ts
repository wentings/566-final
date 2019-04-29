import {vec2, vec3, vec4, mat4, quat} from 'gl-matrix';
import BiomeType from './BiomeType';

export default class Biome {
  position: vec3 = vec3.create();
  direction: vec3 = vec3.fromValues(1, 0, 0); // Ensure that orientation is normalized;
  quaternion: quat = quat.fromValues(1, 0, 0, 0);

  // storing adjacent polygons
  border_edges : vec4[] = []; // (x1, y1, x2, y2)
  corners : vec2[] = []; // the vertices
  color : vec3 = vec3.create();
  bt: BiomeType = new BiomeType();
  temperature: number = 0.5;
  moisture: number = 0.8;
  ocean: boolean = false;
  deepOcean: boolean = false;
  water: boolean = false;
  coast: boolean = false;


  constructor(pos: vec3) {
    this.position = pos;
  }

  clear() {
    this.position = vec3.fromValues(0, 0, 0);
  }

  curbTempMois() {
    if (this.temperature > 1.0) {
      this.temperature = 1.0;
    }
    if (this.moisture > 1.0) {
      this.moisture = 1.0;
    }

    if (this.temperature < 0.0) {
      this.temperature = 0.0;
    }
    if (this.moisture < 0.0) {
      this.moisture = 0.0;
    }
  }

  getBiomeType() {
    this.curbTempMois();
    this.bt.generateBiomeAttributes(this.ocean, this.water, this.coast,
    this.temperature, this.moisture);
    this.bt.setColor();
    this.color = this.bt.color;
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
        mat4.fromScaling(S, vec3.fromValues(1.2, 1, 1.2));

        // Multiply together
        let transformation: mat4 = mat4.create();
        mat4.multiply(transformation, R, S);
        return mat4.multiply(transformation, T, transformation);
  }

}
