<template>
  <div class="output-side">
    <div v-if="this.colorProfile" class="text-analysis">
      <h1>Color Analysis</h1>
      <br />
      <p>Skin undertone: {{ this.skinUndertone }}</p>
      <p>Skin lightness: {{ this.skinLightness }}</p>
      <p>Hair lightness: {{ this.hairLightness }}</p>
      <p>Eye lightness: {{ this.eyeLightness }}</p>
      <br />
      <p>Your seasonal color profile is</p>
      <h1>{{ this.colorProfile }}</h1>
      <br />
      <p style="border: 1px dashed grey; padding: 5%">
        Best colors for {{ this.colorProfile }} include
        {{ this.getBestColorsForSeason(this.colorProfile) }}
      </p>
    </div>
    <div v-else>
      <p>
        Awaiting your color selection <br />
        for analysis
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "skinUndertone",
    "eyeLightness",
    "hairLightness",
    "skinLightness",
    "colorProfile",
    "apiOutput",
  ],
  methods: {},
};
</script>

<style>
.output-side {
  /* display: flex;
  flex-direction: column; */
  height: 100%;
  width: 50%;
  background-color: #f8edeb;
  text-align: center;
  padding: 5%;
  justify-content: center;
}
.text-analysis {
  padding-left: 10%;
  padding-right: 10%;
}
</style>
