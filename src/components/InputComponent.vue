<template>
  <div class="input-side">
    <div class="image-upload">
      <div v-show="!image">
        <label for="file-upload" class="block">
          <div
            id="drop_zone"
            @drop="dropHandler"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
          >
            <p class="text-center text-gray-400">
              Drag & drop <br />
              or <br />
              click <u class="cursor-pointer">here</u> to browse.
            </p>
            <input
              id="file-upload"
              type="file"
              ref="fileInput"
              v-bind="fileInput"
              accept="image/*"
              v-on:change="imageUpload"
              class="hidden-input"
            />
          </div>
        </label>
      </div>
      <img
        ref="image"
        :src="image"
        @click="getColor($event)"
        @load="onImageLoad"
        class="image"
        v-show="image"
      />
      <canvas ref="canvas" style="display: none"></canvas>
      <p v-show="this.image">Click on the picture to pick colors</p>
      <div class="selected-color" v-show="this.selectedColor">
        <p v-show="this.selectedColor">Chosen Color: {{ this.selectedColor }}</p>
        <div
          class="color-circle"
          v-show="this.selectedColor"
          :style="{
            'background-color': this.selectedColor,
          }"
        ></div>
      </div>
      <div v-show="this.selectedColor">
        <p>Set chosen color as</p>
        <button
          class="btn dynapuff-font"
          @click="
            () => {
              this.eyeColor = this.selectedColor;
            }
          "
        >
          Eye Color
        </button>
        <button
          class="btn dynapuff-font"
          @click="
            () => {
              this.hairColor = this.selectedColor;
            }
          "
        >
          Hair Color
        </button>
        <button
          class="btn dynapuff-font"
          @click="
            () => {
              this.skinColor = this.selectedColor;
            }
          "
        >
          Skin Color
        </button>
      </div>
      <div v-show="image">
        <!-- <p>Click on photo to pick colors</p> -->
        <p>
          <label for="eye-color">Eye Color</label>
          <input
            type="text"
            id="eye-color"
            v-model="eyeColor"
            class="text-box dynapuff-font"
          />
        </p>
        <p>
          <label for="eye-color">Hair Color</label>
          <input
            type="text"
            id="hair-color"
            v-model="hairColor"
            class="text-box dynapuff-font"
          />
        </p>
        <p>
          <label for="eye-color">Skin Color</label>
          <input
            type="text"
            id="skin-color"
            v-model="skinColor"
            class="text-box dynapuff-font"
          />
        </p>

        <button class="btn dynapuff-font" @click="this.startColorAnalysis">
          Analyse
        </button>
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
      selectedColor: null
    };
  },
  methods: {
    async loadImageToBox(imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.image = e.target.result;
            this.imageLoaded = false;
        };
        reader.readAsDataURL(imageFile);
        this.$nextTick(() => {
            console.log("Image uploaded and DOM updated");
        });

    },
    imageUpload(event) {
        this.loadImageToBox(event.target.files[0])
    },
    async dropHandler(event) {
        event.preventDefault();
        this.selectedFile = event.dataTransfer.files[0];
        this.image = event.dataTransfer.files[0]
        this.loadImageToBox(event.dataTransfer.files[0])
    },
    onDragLeave(event) {
        event.preventDefault();
    },
    onDragOver(event) {
        event.preventDefault();
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
        // const canvas = document.createElement("canvas");
        const canvas = this.$refs.canvas
        const context = canvas.getContext("2d");
        const image = this.$refs.image;

        if (!image) {
          console.error("Image element not found in $refs");
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // const x = event.clientX;
        // const y = event.clientY;

        const pixel = context.getImageData(x, y, 1, 1).data;
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        console.log("chosen color", rgb)
        this.selectedColor = rgb
        // if (!this.eyeColor) {
        //   this.eyeColor = rgb;
        // } else if (!this.hairColor) {
        //   this.hairColor = rgb;
        // } else {
        //   this.skinColor = rgb;
        // }
        // this.color = rgb;
        // console.log(this.color);
        // if (this.skinColor && this.eyeColor && this.hairColor) {
          // this.doColorAnalysis();
        // }
      });
    },
    startColorAnalysis() {
      this.$emit('analyse', [this.eyeColor, this.skinColor, this.hairColor])
      // doColorAnalysis(this.eyeColor, this.skinColor, this.hairColor)
    }
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
#drop_zone {
  border: 1px dashed grey;
  margin-bottom: 10px;
  padding: 5%;
}
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
.cursor-pointer {
  cursor: pointer;
}
.text-box {
  border: 0px;
  border-bottom: 1px solid black;
  background-color: #fae1dd;
  text-align: center;
  padding: 0.5em;
}
.btn {
  background-color: white;
  color: black;
  padding: 1em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 1em;
  margin-right: 1em;
}
.selected-color {
  display: flex;
  justify-content: center;
  border: 1px dashed grey;
  padding: 1em;
  margin-top: 1em;
}
.color-circle {
  width: 50px;
  height: 50px;
  margin-left: 1em;
  border-radius: 50%;
  font-size: x-small;
}
</style>
