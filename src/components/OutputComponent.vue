<template>
  <div class="output-side">
    <div v-if="this.colorProfile">
      <h1>Color Analysis</h1>
      <br />
      <p>Skin undertone: {{ this.skinUndertone }}</p>
      <p>Skin lightness: {{ this.skinLightness }}</p>
      <p>Hair lightness: {{ this.hairLightness }}</p>
      <p>Eye lightness: {{ this.eyeLightness }}</p>
      <br />
      <p>Your seasonal color profile is</p>
      <h1>{{ this.colorProfile }}</h1>
    </div>
    <div v-else>
      <p>Awaiting your color selection</p>
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
  ],
  methods: {},
};
</script>

<style>
.output-side {
  height: 100%;
  width: 50%;
  background-color: #f8edeb;
  text-align: center;
  padding: 5%;
}
</style>
