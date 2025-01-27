<template>
  <div class="output-side">
    <div v-if="this.colorProfile" class="text-analysis">
      <h1>Color Analysis</h1>
      <br />
      <br />
      <p class="typewriter">Your seasonal color profile is</p>
      <h2 class="typewriter">{{ this.seasonalColorProfile }}</h2>
      <br />
      <p class="explanation typewriter">
        {{ this.explanation ? this.explanation : this.apiOutput }}
      </p>
    </div>
    <div v-else>
      <p class="typewriter">
        Awaiting your color selection <br />
        for analysis
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["seasonalColorProfile", "apiOutput", "explanation"],
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
.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>
