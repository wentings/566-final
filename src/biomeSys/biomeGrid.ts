import {vec2, vec3, mat4, quat } from 'gl-matrix';
import Biome from './Biome';

export default class biomeGrid {
    biome: Biome = new Biome(vec3.fromValues(0, 0, 0),
                               vec3.fromValues(1, 0, 0),
                               quat.fromValues(0, 0, 0, 1)); // Current biome
    biomeHistory: Biome[] = [];
    transformHistory: mat4[] = [];
    pointsPositions: vec2[] = [];

    generatePositions() {
      var i, j;
      for (i = -40; i < 40; i = i+10) {
        for (j = -40; j < 40; j = j+10) {
          var pos = vec2.fromValues(i, j);
          this.pointsPositions.push(pos);
        }
      }
    }

    draw() {
      this.generatePositions();
      var i;
      for (i = 0; i < this.pointsPositions.length; i++) {
        var temp = this.pointsPositions[i];
        this.biome.position = vec3.fromValues(temp[0], temp[1], 10);
        let transMat : any = this.biome.getMatrix();
        this.transformHistory.push(transMat);
      }
    }
}
