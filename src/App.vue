<template>
  <div class="app dynapuff-font">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap"
      rel="stylesheet"
    />
    <h1 class="header">Find YOUR Colors!</h1>
    <div class="container">
      <InputComponent @analyse="this.doColorAnalysis" />
      <OutputComponent
        :skinUndertone="skinUndertone"
        :eyeLightness="eyeLightness"
        :hairLightness="hairLightness"
        :skinLightness="skinLightness"
        :colorProfile="colorProfile"
      />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
.app {
  /* margin: 0; */
  /* display: flex; */
  /* height: 100vh; */
}
.container {
  display: flex;
  height: 100vh;
  margin: 0;
}
.header {
  text-align: center;
}
.dynapuff-font {
  font-family: "DynaPuff", system-ui;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

/* For phone screens */
@media only screen and (max-device-width: 600px) {
  html {
    overflow: auto;
    height: 100%;
  }
  body {
    height: 100%;
    overflow: auto;
  }
  .container {
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    background-color: #f8edeb;
  }
  .input-side {
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 1em 0;
    height: max-content;
  }
  .output-side {
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 1em 0;
    height: max-content;
  }
  .image-upload {
    margin: auto;
  }
  .selected-color {
    font-size: small;
  }
}
</style>

<script>
import InputComponent from "./components/InputComponent.vue";
import OutputComponent from "./components/OutputComponent.vue";

export default {
  components: {
    InputComponent,
    OutputComponent,
  },
  data() {
    return {
      input_colors: [],
      eyeColor: null,
      skinColor: null,
      hairColor: null,
      skinUndertone: null,
      hairLightness: null,
      eyeLightness: null,
      skinLightness: null,
      colorProfile: null,
    };
  },
  methods: {
    doColorAnalysis(input_colors) {
      this.eyeColor = input_colors[0];
      this.skinColor = input_colors[1];
      this.hairColor = input_colors[2];
      // let skin_categories = {
      //   warm: (1, 2, 3),
      //   cool: (1, 2, 3),
      //   neutral: (1, 2, 3),
      //   olive: (1, 2, 3),
      // };
      // let eye_categories = {
      //   cool: (1, 2, 3),
      //   warm: (1, 2, 3),
      // };
      // let hair_categories = {
      //   cool: (1, 2, 3),
      //   warm: (1, 2, 3),
      //   grey: (1, 2, 3),
      // };
      // console.log(skin_categories, eye_categories, hair_categories);
      console.log(
        (this.colorProfile = this.seasonal_color_analysis(
          this.hairColor,
          this.skinColor,
          this.eyeColor
        ))
      );
    },

    determine_undertone(hue) {
      // Determine if a color is warm or cool based on hue.
      // Define a range of warm and cool hues
      if ((0 <= hue && hue <= 50) || (330 <= hue && hue <= 360)) {
        // Reds, yellows (warm)
        return "Warm";
      } else if (50 < hue && hue <= 180) {
        // Greens, cyans (cool)
        return "Cool";
      } else if (180 < hue && hue < 330) {
        // Blues, purples (cool)
        return "Cool";
      } else {
        return "Warm";
      }
    },

    determine_lightness_category(lightness) {
      // Classify lightness into light, medium, or dark.
      console.log("Light", lightness);
      if (lightness > 70) {
        return "Light";
      } else if (lightness > 40 && lightness <= 70) {
        return "Medium";
      } else {
        return "Dark";
      }
    },

    rgbToHsl(rgb) {
      let r = rgb[0];
      let g = rgb[1];
      let b = rgb[2];
      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      return [h * 360, s * 100, l * 100];
    },

    extractRGB(rgbString) {
      // Remove the 'rgb(' and ')' parts, then split by comma
      const values = rgbString.slice(4, -1).split(",").map(Number);
      const [r, g, b] = values;
      return [r, g, b];
    },

    seasonal_color_analysis(hair_rgb, skin_rgb, eye_rgb) {
      hair_rgb = this.extractRGB(hair_rgb);
      skin_rgb = this.extractRGB(skin_rgb);
      eye_rgb = this.extractRGB(eye_rgb);
      console.log(hair_rgb, skin_rgb, eye_rgb);
      console.log(this.rgbToHsl(hair_rgb));
      const hair_l = this.rgbToHsl(hair_rgb)[2];
      const skin_h = this.rgbToHsl(skin_rgb)[0];
      const eye_l = this.rgbToHsl(eye_rgb)[2];
      const skin_l = this.rgbToHsl(skin_rgb)[2];

      console.log(hair_l, skin_h, eye_l, skin_l);
      // # Determine undertones
      // hair_undertone = determine_undertone(hair_h)
      this.skinUndertone = this.determine_undertone(skin_h);
      // eye_undertone = determine_undertone(eye_h)

      // # Determine lightness categories
      this.hairLightness = this.determine_lightness_category(hair_l);
      this.skinLightness = this.determine_lightness_category(skin_l);
      this.eyeLightness = this.determine_lightness_category(eye_l);

      console.log("Skin undertone", this.skinUndertone);
      console.log("Hair lightness", this.hairLightness);
      console.log("Skin lightness", this.skinLightness);
      console.log("Eye lightness", this.eyeLightness);

      // Seasonal decision based on undertones and lightness
      if (this.skinUndertone === "Cool") {
        if (this.hairLightness === "Light" && this.eyeLightness === "Light") {
          return "Summer";
        } else if (this.hairLightness === "Dark" && this.eyeLightness === "Dark") {
          return "Winter";
        } else if (this.hairLightness === "Light" && this.eyeLightness === "Dark") {
          if (this.skinLightness === "Light") {
            return "Winter";
          } else {
            return "Summer";
          }
        }
      } else if (this.skinUndertone === "Warm") {
        if (this.hairLightness === "Light" && this.eyeLightness === "Light") {
          return "Spring";
        } else if (this.hairLightness === "Dark" && this.eyeLightness === "Dark") {
          return "Autumn";
        } else if (this.hairLightness === "Light" && this.eyeLightness === "Dark") {
          if (this.skinLightness === "Light") {
            return "Spring";
          } else {
            return "Autumn";
          }
        }
      }

      // Default if no exact match
      return "Neutral";
    },
  },
};
</script>
