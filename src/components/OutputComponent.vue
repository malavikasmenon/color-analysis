<template>
  <div class="output-side">
    <div v-if="eyeColor && skinColor && hairColor">
      <p>Your color analysis is given below</p>
    </div>
    <div v-else>
      <p>Awaiting your color selection</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    doColorAnalysis() {
      let skin_categories = {
        warm: (1, 2, 3),
        cool: (1, 2, 3),
        neutral: (1, 2, 3),
        olive: (1, 2, 3),
      };
      let eye_categories = {
        cool: (1, 2, 3),
        warm: (1, 2, 3),
      };
      let hair_categories = {
        cool: (1, 2, 3),
        warm: (1, 2, 3),
        grey: (1, 2, 3),
      };
      console.log(skin_categories, eye_categories, hair_categories);
    },
  },
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
