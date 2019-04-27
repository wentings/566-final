import {vec2, vec3, mat4, quat } from 'gl-matrix';
import Biome from './Biome';

export default class biomeGrid {
    biomeGrid: Biome[] = []; // (x_pos + 4) + (Y_pos + 4)
    transformHistory: mat4[] = [];
    colorHistory: vec3[] = [];
    pointsPositions: vec2[] = [];

    generatePositions() {
      var i, j;
      for (i = -20; i < 30; i = i+10) {
        for (j = -20; j < 30; j = j+10) {
          var pos = vec2.fromValues(i, j);
          this.pointsPositions.push(pos);
        }
      }
    }

    generateBiomeGrid() {
      var i;
      for (i = 0; i < this.pointsPositions.length; i++) {
        var temp = this.pointsPositions[i];
        var tempBiome : Biome = new Biome(vec3.fromValues(temp[0], temp[1], 10));
        this.biomeGrid.push(tempBiome);
      }
    }

    setGridConditions() {
      // specifically set one biome
      this.biomeGrid[0].ocean = false;
      this.biomeGrid[0].coast = false;
      this.biomeGrid[0].water = true;
      this.biomeGrid[0].temperature = 0.95;
      this.biomeGrid[0].moisture = 0.0;

      this.biomeGrid[1].ocean = false;
      this.biomeGrid[1].coast = true;
      this.biomeGrid[1].water = false;
      this.biomeGrid[1].temperature = 0.95;
      this.biomeGrid[1].moisture = 0.0;

      this.biomeGrid[2].ocean = true;
      this.biomeGrid[2].coast = true;
      this.biomeGrid[2].water = false;
      this.biomeGrid[2].temperature = 0.95;
      this.biomeGrid[2].moisture = 0.0;

      this.biomeGrid[3].ocean = false;
      this.biomeGrid[3].coast = false;
      this.biomeGrid[3].water = false;
      this.biomeGrid[3].temperature = 0.65;
      this.biomeGrid[3].moisture = 0.4;

      this.biomeGrid[4].ocean = false;
      this.biomeGrid[4].coast = false;
      this.biomeGrid[4].water = false;
      this.biomeGrid[4].temperature = 0.23;
      this.biomeGrid[4].moisture = 0.98;
    }

    draw() {
      this.generatePositions();
      this.generateBiomeGrid();
      this.setGridConditions();
            var i;
      for (i = 0; i < this.pointsPositions.length; i++) {
        // check if the biome is on the outskirts
        var currentBiome = this.biomeGrid[i];
        currentBiome.getBiomeType();
        let transMat : any = currentBiome.getMatrix();
        this.transformHistory.push(transMat);
        this.colorHistory.push(currentBiome.color);
      }
    }
}
