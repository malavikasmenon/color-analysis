<template>
  <div class="app dynapuff-font">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap"
      rel="stylesheet"
    />
    <h1 class="header">Find YOUR colors!</h1>
    <div class="container">
      <InputComponent />
      <OutputComponent />
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
    return {};
  },
  methods: {},
};
</script>
