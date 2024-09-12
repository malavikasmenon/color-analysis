<template>
  <div class="app">
    <div class="input-side">
      <div class="image-upload">
        <div v-show="image">
          <img
            ref="image"
            :src="image"
            @click="getColor($event)"
            @load="onImageLoad"
            class="image"
          />
          <h2>Pick Colors</h2>
          <!-- <p :style="{ backgroundColor: color }">something</p> -->
          <p>Eye Color: {{ eyeColor }}</p>
          <p>Hair Color: {{ hairColor }}</p>
          <p>Skin Color: {{ skinColor }}</p>
        </div>
        <div v-show="!image" class="image-input">
          <p>Upload image here</p>
          <input type="file" @change="imageUpload" accept="image/*" />
        </div>
      </div>
    </div>
    <div class="output-side">
      <div v-if="eyeColor && skinColor && hairColor">
        <p>Your color analysis is given below</p>
      </div>
      <div v-else>
        <p>Awaiting your color selection</p>
      </div>
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
  margin: 0;
  display: flex;
  height: 100vh;
}
.image-upload {
  /* border: 1px solid black; */
  width: 50%;
  margin: auto;
  min-height: 40%;
}
.image-input {
  border: 1px solid black;
  padding: 5%;
  /* height: 100%; */
}
.image {
  height: 100%;
  width: 100%;
}
.input-side {
  height: 100%;
  width: 50%;
  text-align: center;
  padding: 5%;
}
.output-side {
  height: 100%;
  width: 50%;
  background-color: #f6f6f6;
  text-align: center;
  padding: 5%;
}
</style>

<script>
export default {
  data() {
    return {
      image: null,
      eyeColor: null,
      skinColor: null,
      hairColor: null,
      imageLoaded: false,
    };
  },
  methods: {
    imageUpload(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.imageLoaded = false;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.$nextTick(() => {
        console.log("Image uploaded and DOM updated");
      });
    },
    onimageLoad() {
      console.log("here");
      this.imageLoaded = true;
    },
    getColor(event) {
      // if (!this.$refs.image) {
      //   console.log("image not loaded", this.$refs.image);
      //   return;
      // }
      this.$nextTick(() => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const image = this.$refs.image;

        if (!image) {
          console.error("Image element not found in $refs");
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        // const rect = image.getBoundingClientRect();
        // const x = event.clientX - rect.left;
        // const y = event.clientY - rect.top;

        const x = event.clientX;
        const y = event.clientY;

        const pixel = context.getImageData(x, y, 1, 1).data;
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        if (!this.eyeColor) {
          this.eyeColor = rgb;
        } else if (!this.hairColor) {
          this.hairColor = rgb;
        } else {
          this.skinColor = rgb;
        }
        // this.color = rgb;
        // console.log(this.color);
        if (this.skinColor && this.eyeColor && this.hairColor) {
          this.doColorAnalysis();
        }
      });
    },
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
