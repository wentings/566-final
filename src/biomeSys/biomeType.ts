import {vec2, vec3, vec4, mat4, quat} from 'gl-matrix';

export default class BiomeType {
  type: string = "";
  color: vec3 = vec3.fromValues(0, 0, 0);
  elevation: number = 1;

// https://github.com/redblobgames/mapgen2/blob/master/biomes.js

  constructor() {
  }

  rgb(r: number, g: number, b: number) : vec3 {
    var output: vec3 = vec3.create();
    output[0] = r / 255.;
    output[1] = g / 255.;
    output[2] = b / 255.;
    return output;
  }

  generateBiomeAttributes(ocean: boolean, water: boolean, coast: boolean,
    temperature: number, moisture: number) {
    if (ocean) {
        this.type = 'OCEAN';
    } else if (water) {
        if (temperature > 0.9) this.type = "MARSH";
        else if (temperature < 0.2) this.type = 'ICE';
        else this.type = 'LAKE';
    } else if (coast) {
        this.type = 'BEACH';
    } else if (temperature < 0.2) {
        if (moisture > 0.50) this.type = 'SNOW';
        else if (moisture > 0.33) this.type = 'TUNDRA';
        else if (moisture > 0.16) this.type = 'BARE';
        else this.type = 'SCORCHED';
    } else if (temperature < 0.4) {
        if (moisture > 0.66) this.type = 'TAIGA';
        else if (moisture > 0.33) this.type = 'SHRUBLAND';
        else this.type = 'TEMPERATE_DESERT';
    } else if (temperature < 0.7) {
        if (moisture > 0.83) this.type = 'TEMPERATE_RAIN_FOREST';
        else if (moisture > 0.50) this.type = 'TEMPERATE_DECIDUOUS_FOREST';
        else if (moisture > 0.16) this.type = 'GRASSLAND';
        else this.type = 'TEMPERATE_DESERT';
    } else  if (temperature <= 1.0) {
        if (moisture > 0.66) this.type = 'TROPICAL_RAIN_FOREST';
        else if (moisture > 0.33) this.type = 'TROPICAL_SEASONAL_FOREST';
        else if (moisture > 0.16) this.type = 'GRASSLAND';
        else this.type = 'SUBTROPICAL_DESERT';
    }
  }

  setColor() {
    if (this.type == 'OCEAN') {
      this.color = this.rgb(70,130,180);
    }
    else if (this.type == "MARSH") {
      this.color = this.rgb(238,232,170);
    }
    else if (this.type == "ICE") {
      this.color = this.rgb(240,248,255);
    }
    else if (this.type == "LAKE") {
      this.color = this.rgb(135,206,235);
    }
    else if (this.type == "BEACH") {
      this.color = this.rgb(255,250,205);
    }
    else if (this.type == "SNOW") {
      this.color = this.rgb(255,255,255);
    }
    else if (this.type == "TUNDRA") {
      this.color = this.rgb(240,248,255);
    }
    else if (this.type == "BARE") {
      this.color = this.rgb(255,250,250);
    }
    else if (this.type == "SCORCHED") {
      this.color = this.rgb(210,180,140);
    }
    else if (this.type == "TAIGA") {
      this.color = this.rgb(176,224,230);
    }
    else if (this.type == "SHRUBLAND") {
      this.color = this.rgb(144,238,144);
    }
    else if (this.type == "TEMPERATE_DESERT") {
      this.color = this.rgb(238,232,170);
    }
    else if (this.type == "TROPICAL_RAIN_FOREST") {
      this.color = this.rgb(0,200,0);
    }
    else if (this.type == "TEMPERATE_RAIN_FOREST") {
      this.color = this.rgb(0,128,0);
    }
    else if (this.type == "TEMPERATE_DECIDUOUS_FOREST") {
      this.color = this.rgb(85,107,47);
    }
    else if (this.type == "GRASSLAND") {
      this.color = this.rgb(154,205,50);
    }
    else if (this.type == "TROPICAL_SEASONAL_FOREST") {
      this.color = this.rgb(60,179,113);
    }
    else if (this.type == "SUBTROPICAL_DESERT") {
      this.color = this.rgb(128,128,0);
    }
    // else {
    //   this.color = this.rgb(255,0,0);
    // }
  }
}
