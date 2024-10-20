<template>
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
</template>

<script lang="js">
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
}
}
</script>

<style>
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
  background-color: #fae1dd;
  padding: 5%;
}
</style>
