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
