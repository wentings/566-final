import {vec2, vec3, mat4, quat } from 'gl-matrix';
import Biome from './Biome';

export default class biomeGrid {
    biomeGrid: Biome[] = [];
    transformHistory: mat4[] = [];
    colorHistory: vec3[] = [];
    pointsPositions: vec2[] = [];
    univ_Temp: number = 0.0;
    univ_Mois: number = 0.0;
    number_of_regions: string = "";

    constructor(temp: number, mois: number, numberOfRegions: string) {
      this.univ_Temp = temp;
      this.univ_Mois = mois;
      this.number_of_regions = numberOfRegions;
    }

    generatePositions() {
      var i, j;
      if (this.number_of_regions == "small") {
        for (i = -10; i < 10; i = i+1) {
          for (j = -10; j < 10; j = j+1) {
            var pos = vec2.fromValues(i, j);
            var temp_biome : Biome = new Biome(vec3.fromValues(pos[0], 1, pos[1]), 1.2);
            this.biomeGrid[((i+10) * 20 + (j+10))] = temp_biome;
          }
        }
      } else if (this.number_of_regions == "medium") {
        for (i = -10; i < 10; i = i+0.5) {
          for (j = -10; j < 10; j = j+0.5) {
            var pos = vec2.fromValues(i, j);
            var temp_biome : Biome = new Biome(vec3.fromValues(pos[0], 1, pos[1]), 0.5);
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))] = temp_biome;
          }
        }
      } else {
        for (i = -10; i < 10; i = i+0.25) {
          for (j = -10; j < 10; j = j+0.25) {
            var pos = vec2.fromValues(i, j);
            var temp_biome : Biome = new Biome(vec3.fromValues(pos[0], 1, pos[1]), 0.25);
            this.biomeGrid[((i * 4 + 40) * 80 + (j * 4 + 40))] = temp_biome;
          }
        }
      }

    }
    generateRandom(min: number, max: number) : number {
      var random = Math.random() * (max - min) + min;
      return random;
    }

    setOceanEdges() {
      var i, j;
      // edges
      if (this.number_of_regions == "small") {
        for (i = -10; i <10; i++) {
          this.biomeGrid[(i+10) * 20].ocean = true;
        }
        for (i = -10; i <10; i++) {
          this.biomeGrid[(i+10) * 20 + 19].ocean = true;
        }
        for (j = -10; j <10; j++) {
          this.biomeGrid[(-10+10) * 20 + (j+10)].ocean = true;
        }
        for (j = -10; j <10; j++) {
          this.biomeGrid[(9+10) * 20 + (j+10)].ocean = true;
        }
      } else if (this.number_of_regions == "medium") {
        for (i = -10; i <10; i = i+0.5) {
          for (j = -10; j < -9; j= j+0.5) {
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
          }
        }
        for (i = -10; i <10; i = i+0.5) {
          for (j = 9; j < 10; j= j+0.5) {
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
          }
        }
        for (j = -10; j <10; j = j+0.5) {
          for (i = -10; i < -9; i= i+0.5) {
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
          }
        }
        for (j = -10; j <10; j = j+0.5) {
          for (i = 9; i < 10; i= i+0.5) {
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
          }
        }
      } else {
        for (i = -10; i <10; i = i+0.25) {
          for (j = -10; j < -9; j= j+0.25) {
            this.biomeGrid[((i * 4 + 40) * 80 + (j * 4 + 40))].ocean = true;
          }
        }
        for (i = -10; i <10; i = i+0.25) {
          for (j = 9; j < 10; j= j+0.25) {
            this.biomeGrid[((i * 4 + 40) * 80 + (j * 4 + 40))].ocean = true;
          }
        }
        for (j = -10; j <10; j = j+0.25) {
          for (i = -10; i < -9; i= i+0.25) {
            this.biomeGrid[((i * 4 + 40) * 80 + (j * 4 + 40))].ocean = true;
          }
        }
        for (j = -10; j <10; j = j+0.25) {
          for (i = 9; i < 10; i= i+0.25) {
            this.biomeGrid[((i * 4 + 40) * 80 + (j * 4 + 40))].ocean = true;
          }
        }
      }
      // // all the other pieces
      // for(j = -8; j < -4; j++) {
      //     this.biomeGrid[((-5+10) * 20 + (j+10))].ocean = true;
      // }
      //
      // for(i = -9; i < -5; i++) {
      //   for (j = -9; j < -6; j++) {
      //     this.biomeGrid[((i+10) * 20 + (j+10))].ocean = true;
      //   }
      // }
      //
      // for(j = 0; j < 6; j++) {
      //     this.biomeGrid[((-9+10) * 20 + (j+10))].ocean = true;
      // }
      // this.biomeGrid[((-4+10) * 20 + (-7+10))].ocean = true;
      // this.biomeGrid[((-9+10) * 20 + (8+10))].ocean = true;
      // this.biomeGrid[((-7+10) * 20 + (8+10))].ocean = true;
      // for (i = -2; i <1; i++) {
      //   this.biomeGrid[(i+10) * 20 + 18].ocean = true;
      // }
      // for (i = 3; i <9; i++) {
      //   this.biomeGrid[(i+10) * 20 + 18].ocean = true;
      // }
      // this.biomeGrid[((0+10) * 20 + (7+10))].ocean = true;
      // for (i = 6; i <9; i++) {
      //   this.biomeGrid[(i+10) * 20 + 17].ocean = true;
      // }
      // for (i = 7; i <9; i++) {
      //   for (j = 6; j < 9; j++) {
      //   this.biomeGrid[(i+10) * 20 + 10 + j].ocean = true;
      //   }
      // }
      // for (j = 4; j < 6; j++) {
      // this.biomeGrid[(8+10) * 20 + 10 + j].ocean = true;
      // }
      // for (j = -3; j < 0; j++) {
      // this.biomeGrid[(8+10) * 20 + 10 + j].ocean = true;
      // }
      // for (i = 6; i <9; i++) {
      //   for (j = -9; j < -7; j++) {
      //   this.biomeGrid[(i+10) * 20 + 10 + j].ocean = true;
      //   }
      // }
      // for (i = 4; i <6; i++) {
      //   this.biomeGrid[(i+10) * 20 + 10 + -9].ocean = true;
      // }
    }

    setOceanInside() {
      var i, j;
      // edges
      if (this.number_of_regions == "small") {
        for (i = -9; i <9; i++) {
          for(j = -9; j<9; j++) {
            var rand = 1.0;
            rand = rand - Math.abs(i - -10) * this.generateRandom(0.05, 0.2) -
            Math.abs(j - -10) * this.generateRandom(0.05, 0.2);
            if (rand > 0.5) {
                this.biomeGrid[(i+10) * 20 + (j+10)].ocean = true;
            }
          }
        }
        for (i = -9; i <9; i++) {
          for(j = 9; j>-9; j--) {
            var rand = 1.0;
            rand = rand - Math.abs(i - -10) * this.generateRandom(0.05, 0.1) -
            Math.abs(j - 10) * this.generateRandom(0.05, 0.1);
            if (rand > 0.5) {
                this.biomeGrid[(i+10) * 20 + (j+10)].ocean = true;
            }
          }
        }
        for (j = -9; j <9; j++) {
          for(i = 9; i>-9; i--) {
            var rand = 1.0;
            rand = rand - Math.abs(i-10) * this.generateRandom(0.05, 0.2) -
            Math.abs(j - -10) * this.generateRandom(0.05, 0.2);
            if (rand > 0.5) {
                this.biomeGrid[(i+10) * 20 + (j+10)].ocean = true;
            }
          }
        }
        for (j = 9; j >-9; j--) {
          for(i = 9; i> -9; i--) {
            var rand = 1.0;
            rand = rand - Math.abs(i-10) * this.generateRandom(0.05, 0.2) -
            Math.abs(j -10) * this.generateRandom(0.05, 0.2);
            if (rand > 0.5) {
                this.biomeGrid[(i+10) * 20 + (j+10)].ocean = true;
            }
          }
        }
      } else if (this.number_of_regions == "medium") {
        for (i = -9; i <9; i = i + 0.5) {
          for(j = -9; j<9; j = j + 0.5) {
            var rand = 1.0;
            rand = rand - Math.abs(i * 2 - -20) * this.generateRandom(0.02, 0.1) -
            Math.abs(j*2 - -20) * this.generateRandom(0.02, 0.07);
            if (rand > 0.5) {
                this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
            }
          }
        }
        for (i = -9; i <9; i = i+0.5) {
          for(j = 9; j>-9; j = j-0.5) {
            var rand = 1.0;
            rand = rand - Math.abs(i*2 - -20) * this.generateRandom(0.02, 0.05) -
            Math.abs(j*2 - 20) * this.generateRandom(0.05, 0.07);
            if (rand > 0.5) {
                this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
            }
          }
        }
        for (j = -9; j <9; j = j+0.5) {
          for(i = 9; i>-9; i = i-0.5) {
            var rand = 1.0;
            rand = rand - Math.abs(i*2-20) * this.generateRandom(0.05, 0.07) -
            Math.abs(j*2 - -20) * this.generateRandom(0.05, 0.1);
            if (rand > 0.5) {
                this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
            }
          }
        }
        for (j = 9; j >-9; j = j-0.5) {
          for(i = 9; i> -9; i = i-0.5) {
            var rand = 1.0;
            rand = rand - Math.abs(i*2-20) * this.generateRandom(0.05, 0.07) -
            Math.abs(j*2-20) * this.generateRandom(0.05, 0.1);
            if (rand > 0.5) {
                this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].ocean = true;
            }
          }
        }
      }
      else {
        for (i = -9; i <9; i = i + 0.25) {
          for(j = -9; j<9; j = j + 0.25) {
            var rand = 1.0;
            rand = rand - Math.abs(i * 4 - -40) * this.generateRandom(0.01, 0.05) -
            Math.abs(j*4 - -40) * this.generateRandom(0.009 , 0.05);
            if (rand > 0.5) {
                this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].ocean = true;
            }
          }
        }
        for (i = -9; i <9; i = i+0.25) {
          for(j = 9; j>-9; j = j-0.25) {
            var rand = 1.0;
            rand = rand - Math.abs(i*4 - -40) * this.generateRandom(0.01, 0.02) -
            Math.abs(j*4 - 40) * this.generateRandom(0.01, 0.04);
            if (rand > 0.5) {
                this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].ocean = true;
            }
          }
        }
        for (j = -9; j <9; j = j+0.25) {
          for(i = 9; i>-9; i = i-0.25) {
            var rand = 1.0;
            rand = rand - Math.abs(i*4-40) * this.generateRandom(0.01, 0.02) -
            Math.abs(j*4 - -40) * this.generateRandom(0.009, 0.03);
            if (rand > 0.5) {
                this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].ocean = true;
            }
          }
        }
        for (j = 9; j >-9; j = j-0.25) {
          for(i = 9; i> -9; i = i-0.25) {
            var rand = 1.0;
            rand = rand - Math.abs(i*4-40) * this.generateRandom(0.008, 0.04) -
            Math.abs(j*4-40) * this.generateRandom(0.01, 0.03);
            if (rand > 0.5) {
                this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].ocean = true;
            }
          }
        }
      }
    }

    setCoast() {
      var i, j;
      if (this.number_of_regions == "small") {
        for (i = -9; i < 9; i = i+1) {
          for (j = -9; j < 9; j = j+1) {
            // check if any surrounding block is an ocean
            if (this.checkSurroundingOcean(i, j)) {
              this.biomeGrid[((i+10) * 20 + (j+10))].coast = true;
            }
          }
        }
      }
      else if (this.number_of_regions == "medium") {
        for (i = -9; i < 9.5; i = i+0.5) {
          for (j = -9; j < 9.5; j = j+0.5) {
            // check if any surrounding block is an ocean
            if (this.checkSurroundingOcean(i, j)) {
              this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].coast = true;
            }
          }
        }
      }
      else if (this.number_of_regions == "large") {
        for (i = -9; i < 9; i = i+0.25) {
          for (j = -9; j < 9; j = j+0.25) {
            // check if any surrounding block is an ocean
            if (this.checkSurroundingOcean(i, j)) {
              this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].coast = true;
            }
          }
        }
      }
    }

    checkSurroundingOcean(i:number, j:number) : boolean {
      var topLeft, left, bottomLeft, top, bottom, topRight, right, bottomRight;
      if (this.number_of_regions == "small") {
        topLeft = this.biomeGrid[((i-1+10) * 20 + (j-1+10))].ocean;
        left = this.biomeGrid[((i-1+10) * 20 + (j+10))].ocean;
        bottomLeft = this.biomeGrid[((i-1+10) * 20 + (j+1+10))].ocean;
        top = this.biomeGrid[((i+10) * 20 + (j-1+10))].ocean;
        bottom = this.biomeGrid[((i+10) * 20 + (j+1+10))].ocean;
        topRight = this.biomeGrid[((i+1+10) * 20 + (j-1+10))].ocean;
        right = this.biomeGrid[((i+1+10) * 20 + (j+10))].ocean;
        bottomRight = this.biomeGrid[((i+1+10) * 20 + (j+1+10))].ocean;
      }
      else if (this.number_of_regions == "medium") {
        topLeft = this.biomeGrid[(((i-0.5) * 2 +20) * 40 + ((j-0.5) * 2 +20))].ocean;
        left = this.biomeGrid[(((i-0.5)*2+20) * 40 + (j*2+20))].ocean;
        bottomLeft = this.biomeGrid[(((i-0.5)*2+20) * 40 + ((j+0.5)*2+20))].ocean;
        top = this.biomeGrid[((i*2+20) * 40 + ((j-0.5)*2+20))].ocean;
        bottom = this.biomeGrid[((i*2+20) * 40 + ((j+0.5)*2+20))].ocean;
        topRight = this.biomeGrid[(((i+0.5)*2+20) * 40 + ((j-0.5)*2+20))].ocean;
        right = this.biomeGrid[(((i+0.5)*2+20) * 40 + (j*2+20))].ocean;
        bottomRight = this.biomeGrid[(((i+0.5)*2+20) * 40 + ((j+0.5)*2+20))].ocean;
      }
      else  {
        topLeft = this.biomeGrid[(((i-0.25) * 4 +40) * 80 + ((j-0.25) * 4 +40))].ocean;
        left = this.biomeGrid[(((i-0.25)*4+40) * 80 + (j*4+40))].ocean;
        bottomLeft = this.biomeGrid[(((i-0.25)*4+40) * 80 + ((j+0.25)*4+40))].ocean;
        top = this.biomeGrid[((i*4+40) * 80 + ((j-0.25)*4+40))].ocean;
        bottom = this.biomeGrid[((i*4+40) * 80 + ((j+0.25)*4+40))].ocean;
        topRight = this.biomeGrid[(((i+0.25)*4+40) * 80 + ((j-0.25)*4+40))].ocean;
        right = this.biomeGrid[(((i+0.25)*4+40) * 80 + (j*4+40))].ocean;
        bottomRight = this.biomeGrid[(((i+0.25)*4+40) * 80 + ((j+0.25)*4+40))].ocean;
      }
      return topLeft || left || bottomLeft || top || bottom ||
      topRight || right || bottomRight;
    }

    setLake() {
      var i;
      if (this.number_of_regions == "small") {
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
    }

    setSurroudingMarshes(i: number, j:number) {
      if (this.number_of_regions == "small") {
        this.setOneMarsh(((i-1+10) * 20 + (j-1+10)));
        this.setOneMarsh(((i-1+10) * 20 + (j+10)));
        this.setOneMarsh(((i-1+10) * 20 + (j+1+10)));
        this.setOneMarsh(((i+10) * 20 + (j-1+10)));
        this.setOneMarsh(((i+10) * 20 + (j+1+10)));
        this.setOneMarsh(((i+1+10) * 20 + (j-1+10)));
        this.setOneMarsh(((i+1+10) * 20 + (j+10)));
        this.setOneMarsh(((i+1+10) * 20 + (j+1+10)));
      }
    }

    setOneMarsh(i: number) {
      this.biomeGrid[i].water = true;
      this.biomeGrid[i].temperature = 0.95;
    }

    setMoisture() {
      // the moisture decreases radially horizontally i highest at 4, j highest at -2
      var i, j;
      if (this.number_of_regions == "small") {
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
      else if (this.number_of_regions == "medium") {
        for (i = 1; i < 10; i = i+0.5) {
          for (j = -2; j < 10; j = j+0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.05, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.05, 0.1);
          }
        }

        for (i = 1; i < 10; i = i+0.5) {
          for (j = -2; j > -10; j = j-0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.05, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.05, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.5) {
          for (j = -2; j > -10; j = j-0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.02, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.02, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.5) {
        for (j = -2; j < 10; j = j+0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.02, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.02, 0.1);
          }
        }
      }
      else {
        for (i = 1; i < 10; i = i+0.25) {
          for (j = -2; j < 10; j = j+0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.01, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.01, 0.1);
          }
        }

        for (i = 1; i < 10; i = i+0.25) {
          for (j = -2; j > -10; j = j-0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.0, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.0, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.25) {
          for (j = -2; j > -10; j = j-0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.0, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.02, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.25) {
        for (j = -2; j < 10; j = j+0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].moisture =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.0, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.01, 0.1);
          }
        }
      }
    }

    setTemperature() {
      var i, j;
      // coldest being 0,0
      if (this.number_of_regions == "small") {
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
      else if (this.number_of_regions == "medium") {
        for (i = 1; i < 10; i = i+0.5) {
          for (j = -2; j < 10; j = j+0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.05, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.05, 0.1);
          }
        }

        for (i = 1; i < 10; i = i+0.5) {
          for (j = -2; j > -10; j = j-0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.05, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.05, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.5) {
          for (j = -2; j > -10; j = j-0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.02, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.02, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.5) {
        for (j = -2; j < 10; j = j+0.5) {
            var current_mois = this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature;
            this.biomeGrid[((i * 2 +20) * 40 + (j * 2 +20))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.02, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.02, 0.1);
          }
        }
      }
      else {
        for (i = 1; i < 10; i = i+0.25) {
          for (j = -2; j < 10; j = j+0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.01, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.01, 0.1);
          }
        }

        for (i = 1; i < 10; i = i+0.25) {
          for (j = -2; j > -10; j = j-0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.0, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.0, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.25) {
          for (j = -2; j > -10; j = j-0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.0, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.02, 0.1);
          }
        }

        for (i = 1; i > -10; i = i-0.25) {
        for (j = -2; j < 10; j = j+0.25) {
            var current_mois = this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature;
            this.biomeGrid[((i * 4 +40) * 80 + (j * 4 +40))].temperature =
            current_mois - Math.abs(i - 1) * this.generateRandom(0.0, 0.1) -
            Math.abs(j - -2) * this.generateRandom(0.01, 0.1);
          }
        }
      }
    }

    setGridConditions() {
      this.setMoisture();
      this.setTemperature();
      this.setOceanEdges();
      this.setOceanInside();
      this.setCoast();
      this.setLake();
    }

    draw() {
      this.generatePositions();
      var i;
      for (i = 0; i < this.biomeGrid.length; i++) {
        var currentBiome = this.biomeGrid[i];
        currentBiome.temperature = this.univ_Temp;
        currentBiome.moisture = this.univ_Mois;
      }
      this.setGridConditions();

      for (i = 0; i < this.biomeGrid.length; i++) {
        // check if the biome is on the outskirts
        var currentBiome = this.biomeGrid[i];
        currentBiome.getBiomeType();
        let transMat : any = currentBiome.getMatrix();
        this.transformHistory.push(transMat);
        this.colorHistory.push(currentBiome.color);
      }
    }
}
