<template>
  <div>
    <div class="helper"></div>
    <div class="drop display-inline align-center image-select" @dragover.prevent @drop="onDrop">
      <div class="helper"></div>
      <label v-if="!selectImage" class="btn display-inline">
        SELECT OR DROP AN IMAGE
        <input type="file" name="image" @change="onChange" />
      </label>
      <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
        <img :src="selectImage" alt class="img" @click="removeFile" ti/>
        <br />
        <!-- <i class="fas fa-minus-circle fa-2x remove-image" @click="removeFile"></i> -->
      </div>
    </div>
  </div>
  <!-- <button class="btn remove-image" @click="removeFile">REMOVE</button> -->
  <!-- <button class="btn remkove-image" @click="removeFile">REMOVE</button> -->
</template>
<script>
export default {
  data () {
    return {
      selectImage: ''
    }
  },
  props: {
    image: {
      type: String
    },
    isNotChange: {
      type: Boolean
    }
  },
  created () {
    console.log(this.image)
    this.$set(this, 'selectImage', this.image)
  },
  methods: {
    onDrop: function (e) {
      if (this.isNotChange) return
      e.stopPropagation()
      e.preventDefault()
      var files = e.dataTransfer.files
      let file = files[0]
      this.$emit('loadImage', file)
      this.createFile(files[0])
    },
    onChange (e) {
      if (this.isNotChange) return
      var files = e.target.files
      let file = files[0]
      this.$emit('loadImage', file)
      this.createFile(files[0])
    },
    createFile (file) {
      if (!file.type.match('image.*')) {
        alert('Select an image')
        return
      }
      var img = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = function (e) {
        vm.selectImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeFile () {
      if (this.isNotChange) return
      this.selectImage = ''
      this.$emit('loadImage', null)
    }
  },
  watch: {
    image (val, ol) {
      console.log('change ' + val)
      this.$set(this, 'selectImage', val)
    }
  }
}
</script>
<style lang="scss">
.remove-image {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #d3394c;
}

.image-select {
  input[type="file"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
}

.align-center {
  text-align: center;
}

.helper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  width: 0;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}

.img {
  border: 1px solid #f6f6f6;
  display: inline-block;
  height: auto;
  max-height: 200px;
  max-width: 80%;
  width: auto;
}

.drop {
  background-color: #f2f2f2;
  border: 4px dashed #ccc;
  background-color: #f6f6f6;
  border-radius: 2px;
  height: 100%;
  height: 200px;
  //   max-width: 200px;
  width: 100%;
}
</style>
