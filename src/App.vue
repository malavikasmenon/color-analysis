<template>
  <div class="app">
    <div class="input-side">
      <div class="image-upload">
        <div v-if="image">
          <img :src="image" class="image">
          <h2> Pick Colors </h2>
        </div>
        <div v-else class="image-input">
          <p>Upload image here</p>
          <input type="file" @change="imageUpload" accept="image/*"> 
        </div>
      </div>
    </div>
    <div class="output-side">
      <h1></h1>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
.app{
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

    }
  },
  methods: {
    imageUpload(event) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
    }
    
  },
}

</script>