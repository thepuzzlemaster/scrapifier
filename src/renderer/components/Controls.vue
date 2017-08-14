<template>
  <div class="controls-container">
    <h4>Site URL:</h4>
    <input class="site-url" type="text" v-model="url">
    <hr>

    <div class="btn btn-inverse link" v-on:click="selectElement">
      <span class="fa fa-pencil-square-o"></span>
      <span>Select Element</span>
    </div>
    <div class="input-group">
      <label>
        Selector
        <input type="text" v-model="selector">
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'controls',
    props: ['url'],
    data: function () {
      return {
        selector: ''
      }
    },
    methods: {
      selectElement: function () {
        this.$electron.ipcRenderer.send('hover-init')
      }
    },
    mounted: function () {
      this.$electron.ipcRenderer.on('global-selector', (event, selector) => {
        this.selector = selector
      })
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
