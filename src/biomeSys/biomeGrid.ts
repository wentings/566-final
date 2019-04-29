import {vec2, vec3, mat4, quat } from 'gl-matrix';
import Biome from './Biome';

export default class biomeGrid {
    biomeGrid: Biome[] = [];
    transformHistory: mat4[] = [];
    colorHistory: vec3[] = [];
    pointsPositions: vec2[] = [];
    univ_Temp: number = 0.0;
    univ_Mois: number = 0.0;

    constructor(temp: number, mois: number) {
      this.univ_Temp = temp;
      this.univ_Mois = mois;
    }

    generatePositions() {
      var i, j;
      for (i = -10; i < 10; i = i+1) {
        for (j = -10; j < 10; j = j+1) {
          var pos = vec2.fromValues(i, j);
          var temp_biome : Biome = new Biome(vec3.fromValues(pos[0], 1, pos[1]));
          this.biomeGrid[((i+10) * 20 + (j+10))] = temp_biome;
        }
      }
    }
    generateRandom(min: number, max: number) : number {
      var random = Math.random() * (max - min) + min;
      return random;
    }

    setOcean() {
      var i, j;
      // edges
      for (i = -10; i <10; i++) {
        this.biomeGrid[(i+10) * 20].ocean = true;
        this.biomeGrid[(i+10) * 20].deepOcean = true;
      }
      for (i = -10; i <10; i++) {
        this.biomeGrid[(i+10) * 20 + 19].ocean = true;
        this.biomeGrid[(i+10) * 20 + 19].deepOcean = true;
      }
      for (j = -10; j <10; j++) {
        this.biomeGrid[(-10+10) * 20 + (j+10)].ocean = true;
        this.biomeGrid[(-10+10) * 20 + (j+10)].deepOcean = true;
      }
      for (j = -10; j <10; j++) {
        this.biomeGrid[(9+10) * 20 + (j+10)].ocean = true;
        this.biomeGrid[(9+10) * 20 + (j+10)].deepOcean = true;
      }
      // all the other pieces
      for(j = -8; j < -4; j++) {
          this.biomeGrid[((-5+10) * 20 + (j+10))].ocean = true;
      }

      for(i = -9; i < -5; i++) {
        for (j = -9; j < -6; j++) {
          this.biomeGrid[((i+10) * 20 + (j+10))].ocean = true;
        }
      }

      for(j = 0; j < 6; j++) {
          this.biomeGrid[((-9+10) * 20 + (j+10))].ocean = true;
      }
      this.biomeGrid[((-4+10) * 20 + (-7+10))].ocean = true;
      this.biomeGrid[((-9+10) * 20 + (8+10))].ocean = true;
      this.biomeGrid[((-7+10) * 20 + (8+10))].ocean = true;
      for (i = -2; i <1; i++) {
        this.biomeGrid[(i+10) * 20 + 18].ocean = true;
      }
      for (i = 3; i <9; i++) {
        this.biomeGrid[(i+10) * 20 + 18].ocean = true;
      }
      this.biomeGrid[((0+10) * 20 + (7+10))].ocean = true;
      for (i = 6; i <9; i++) {
        this.biomeGrid[(i+10) * 20 + 17].ocean = true;
      }
      for (i = 7; i <9; i++) {
        for (j = 6; j < 9; j++) {
        this.biomeGrid[(i+10) * 20 + 10 + j].ocean = true;
        }
      }
      for (j = 4; j < 6; j++) {
      this.biomeGrid[(8+10) * 20 + 10 + j].ocean = true;
      }
      for (j = -3; j < 0; j++) {
      this.biomeGrid[(8+10) * 20 + 10 + j].ocean = true;
      }
      for (i = 6; i <9; i++) {
        for (j = -9; j < -7; j++) {
        this.biomeGrid[(i+10) * 20 + 10 + j].ocean = true;
        }
      }
      for (i = 4; i <6; i++) {
        this.biomeGrid[(i+10) * 20 + 10 + -9].ocean = true;
      }
    }

    setCoast() {
      var i, j;
      for (i = -9; i < 9; i = i+1) {
        for (j = -9; j < 9; j = j+1) {
          // check if any surrounding block is an ocean
          if (this.checkSurroundingOcean(i, j)) {
            this.biomeGrid[((i+10) * 20 + (j+10))].coast = true;
          }
        }
      }
    }

    checkSurroundingOcean(i:number, j:number) : boolean {
      var topLeft = this.biomeGrid[((i-1+10) * 20 + (j-1+10))].ocean;
      var left = this.biomeGrid[((i-1+10) * 20 + (j+10))].ocean;
      var bottomLeft = this.biomeGrid[((i-1+10) * 20 + (j+1+10))].ocean;
      var top = this.biomeGrid[((i+10) * 20 + (j-1+10))].ocean;
      var bottom = this.biomeGrid[((i+10) * 20 + (j+1+10))].ocean;
      var topRight = this.biomeGrid[((i+1+10) * 20 + (j-1+10))].ocean;
      var right = this.biomeGrid[((i+1+10) * 20 + (j+10))].ocean;
      var bottomRight = this.biomeGrid[((i+1+10) * 20 + (j+1+10))].ocean;
      return topLeft || left || bottomLeft || top || bottom ||
      topRight || right || bottomRight;
    }

    setLake() {
      var i;
      for (i = 0; i < 6; i = i+1) {
        this.setSurroudingMarshes(i, -1);
      }
      for (i = 1; i < 6; i = i+1) {
        this.setSurroudingMarshes(i, -2);
      }
      for (i = 3; i < 6; i = i+1) {
        this.setSurroudingMarshes(i, -3);
      }

      for (i = 0; i < 6; i = i+1) {
        this.biomeGrid[((i+10) * 20 + (-1+10))].water = true;
        this.biomeGrid[((i+10) * 20 + (-1+10))].moisture = 1.0;
        this.biomeGrid[((i+10) * 20 + (-1+10))].temperature = 0.5;
      }
      for (i = 1; i < 6; i = i+1) {
        this.biomeGrid[((i+10) * 20 + (-2+10))].water = true;
        this.biomeGrid[((i+10) * 20 + (-2+10))].moisture = 1.0;
        this.biomeGrid[((i+10) * 20 + (-2+10))].temperature = 0.5;
      }
      for (i = 3; i < 6; i = i+1) {
        this.biomeGrid[((i+10) * 20 + (-3+10))].water = true;
        this.biomeGrid[((i+10) * 20 + (-3+10))].moisture = 1.0;
        this.biomeGrid[((i+10) * 20 + (-3+10))].temperature = 0.5;
      }
    }

    setSurroudingMarshes(i: number, j:number) {
      this.setOneMarsh(((i-1+10) * 20 + (j-1+10)));
      this.setOneMarsh(((i-1+10) * 20 + (j+10)));
      this.setOneMarsh(((i-1+10) * 20 + (j+1+10)));
      this.setOneMarsh(((i+10) * 20 + (j-1+10)));
      this.setOneMarsh(((i+10) * 20 + (j+1+10)));
      this.setOneMarsh(((i+1+10) * 20 + (j-1+10)));
      this.setOneMarsh(((i+1+10) * 20 + (j+10)));
      this.setOneMarsh(((i+1+10) * 20 + (j+1+10)));
    }

    setOneMarsh(i: number) {
      this.biomeGrid[i].water = true;
      this.biomeGrid[i].temperature = 0.95;
    }

    setMoisture() {
      // the moisture decreases radially horizontally i highest at 4, j highest at -2
      var i, j;
      for (i = 1; i < 10; i = i+1) {
        for (j = -2; j < 10; j = j+1) {
          var current_mois = this.biomeGrid[((i+10) * 20 + (j+10))].moisture;
          this.biomeGrid[((i+10) * 20 + (j+10))].moisture =
          current_mois - Math.abs(i - 1) * this.generateRandom(0.05, 0.5) -
          Math.abs(j - -2) * this.generateRandom(0.05, 0.5);
        }
      }

      for (i = 1; i < 10; i = i+1) {
        for (j = -2; j > -10; j = j-1) {
          var current_mois = this.biomeGrid[((i+10) * 20 + (j+10))].moisture;
          this.biomeGrid[((i+10) * 20 + (j+10))].moisture =
          current_mois - Math.abs(i - 1) * this.generateRandom(0.05, 0.5) -
          Math.abs(j - -2) * this.generateRandom(0.05, 0.5);
        }
      }

      for (i = 1; i > -10; i = i-1) {
        for (j = -2; j > -10; j = j-1) {
          var current_mois = this.biomeGrid[((i+10) * 20 + (j+10))].moisture;
          this.biomeGrid[((i+10) * 20 + (j+10))].moisture =
          current_mois - Math.abs(i - 1) * this.generateRandom(0.02, 0.1) -
          Math.abs(j - -2) * this.generateRandom(0.02, 0.3);
        }
      }

      for (i = 1; i > -10; i = i-1) {
      for (j = -2; j < 10; j = j+1) {
          var current_mois = this.biomeGrid[((i+10) * 20 + (j+10))].moisture;
          this.biomeGrid[((i+10) * 20 + (j+10))].moisture =
          current_mois - Math.abs(i - 1) * this.generateRandom(0.02, 0.1) -
          Math.abs(j - -2) * this.generateRandom(0.02, 0.3);
        }
      }
    }

    setTemperature() {
      var i, j;
      // coldest being 0,0
      for (i = 0; i < 10; i = i+1) {
        for (j = 0; j < 10; j = j+1) {
          var current_temp = this.biomeGrid[((i+10) * 20 + (j+10))].temperature;
          this.biomeGrid[((i+10) * 20 + (j+10))].temperature =
          current_temp - Math.abs(i) * this.generateRandom(0.02, 0.2) -
          Math.abs(j) * this.generateRandom(0.02, 0.16);
        }
      }

      for (i = 0; i < 10; i = i+1) {
        for (j = 0; j > -10; j = j-1) {
          var current_temp = this.biomeGrid[((i+10) * 20 + (j+10))].temperature;
          this.biomeGrid[((i+10) * 20 + (j+10))].temperature =
          current_temp - Math.abs(i) * this.generateRandom(0.02, 0.2) -
          Math.abs(j) * this.generateRandom(0.02, 0.16);
        }
      }

      for (i = 0; i > -10; i = i-1) {
        for (j = 0; j > -10; j = j-1) {
          var current_mois = this.biomeGrid[((i+10) * 20 + (j+10))].temperature;
          this.biomeGrid[((i+10) * 20 + (j+10))].temperature =
          current_temp - Math.abs(i) * this.generateRandom(0.05, 0.2) -
          Math.abs(j) * this.generateRandom(0.05, 0.2);
        }
      }

      for (i = 0; i > -10; i = i-1) {
        for (j = 0; j < 10; j = j+1) {
          var current_mois = this.biomeGrid[((i+10) * 20 + (j+10))].temperature;
          this.biomeGrid[((i+10) * 20 + (j+10))].temperature =
          current_temp - Math.abs(i) * this.generateRandom(0.05, 0.2) -
          Math.abs(j) * this.generateRandom(0.05, 0.2);
        }
      }
    }

    setGridConditions() {
      this.setMoisture();
      this.setTemperature();
      this.setOcean();
      this.setCoast();
      this.setLake();
    }

    draw() {
      this.generatePositions();
      this.setGridConditions();
            var i;
      for (i = 0; i < this.biomeGrid.length; i++) {
        // check if the biome is on the outskirts
        var currentBiome = this.biomeGrid[i];
        currentBiome.curbTempMois();
        currentBiome.getBiomeType();
        console.log("moisture " + currentBiome.moisture + " temperature " + currentBiome.temperature);
        let transMat : any = currentBiome.getMatrix();
        this.transformHistory.push(transMat);
        this.colorHistory.push(currentBiome.color);
      }
    }
}
