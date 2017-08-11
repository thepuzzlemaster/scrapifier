<template>
  <div class="controls-container">
    <h4>Site URL:</h4>
    <input class="site-url" type="text" v-model="url">
    <hr>

    <div class="btn btn-inverse link" v-on:click="selectElement">
      <span class="fa fa-pencil-square-o"></span>
      <span>Select Element</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'controls',
    props: ['url'],
    methods: {
      selectElement: function () {
        this.$electron.ipcRenderer.on('pong', (event, data) => {
          console.log('pong received!!!', data)
        })

        this.$electron.ipcRenderer.send('select-element')
      }
    }
  }
</script>

<style lang="scss">
  .fa + span {
    font-size: 12px;
  }

  .controls-container {
    padding: .5em;
  }
</style>
