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
        <input type="text" v-model="selector" v-on:keyup.enter="submitSelector">
      </label>
    </div>
    <span class="sub-text" v-if="count">{{count}} elements selected</span>
  </div>
</template>

<script>
  export default {
    name: 'controls',
    props: ['url'],
    data: function () {
      return {
        selector: '',
        count: null
      }
    },
    methods: {
      selectElement: function () {
        this.$electron.ipcRenderer.send('hover-init')
      },
      submitSelector: function () {
        this.$electron.ipcRenderer.send('selector-updated', this.selector)
      }
    },
    mounted: function () {
      this.$electron.ipcRenderer.on('global-selector', (event, selector) => {
        this.selector = selector
      })

      this.$electron.ipcRenderer.on('selector-info', (event, selectorInfo) => {
        this.count = selectorInfo.count
        this.selector = selectorInfo.selector
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

  .sub-text {
    font-size: 11px;
  }
</style>
