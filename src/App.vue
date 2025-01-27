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
        :apiOutput="apiOutput"
        :seasonalColorProfile="seasonalColorProfile"
        :explanation="explanation"
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
  .btn {
    margin-bottom: 0.75em;
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
      seasonalColorProfile: null,
      apiOutput: "",
      explanation: "",
    };
  },
  methods: {
    async callOpenAI(prompt) {
      try {
        const response = await fetch("/.netlify/functions/openai-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("OpenAI Response:", data.response);
        return data.response;
      } catch (error) {
        console.error("Error calling OpenAI:", error);
        return "An error occurred while calling OpenAI.";
      }
    },
    doColorAnalysis(input_colors) {
      this.eyeColor = input_colors[0];
      this.skinColor = input_colors[1];
      this.hairColor = input_colors[2];
      console.log(this.hairColor, this.skinColor, this.eyeColor);
      let prompt = `My skin-tone is ${this.skinColor}, my hair color is ${this.hairColor} and my eye color is ${this.eyeColor}. Which skin-tone color palette am I in terms of seasons? What colors would look good on me? Answer in 150 tokens in this format:
                Seasonal Profile: ___ \n Explanation: ___`;
      this.callOpenAI(prompt).then((response) => {
        this.apiOutput = response;
        console.log("Generated text:", response);
        const resultText = response.trim();
        const seasonalProfileMatch = resultText.match(/Seasonal Profile:\s*(.+)/);
        const explanationMatch = resultText.match(/Explanation:\s*(.+)/);
        this.seasonalColorProfile = seasonalProfileMatch ? seasonalProfileMatch[1] : null;
        this.explanation = explanationMatch ? explanationMatch[1] : null;
      });
    },
  },
};
</script>
