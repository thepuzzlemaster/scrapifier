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
    <div class="btn link" v-on:click="useSelector">Extract Data</div>
  </div>
</template>

<script>
  export default {
    name: 'controls',
    props: ['url'],
    data: function () {
      return {
        selector: '',
        count: null,
        isClick: false
      }
    },
    methods: {
      selectElement: function () {
        this.$electron.ipcRenderer.send('hover-init')
      },
      useSelector: function () {
        console.log('useSelector')
        this.$electron.ipcRenderer.send('use-selector', this.selector)
      },
      submitSelector: function () {
        this.$electron.ipcRenderer.send('selector-updated', this.selector)
      }
    },
    mounted: function () {
      this.$electron.ipcRenderer.on('selector-info', (event, selectorInfo) => {
        this.count = selectorInfo.count
        this.selector = selectorInfo.selector
        this.isClick = false
      })

      this.$electron.ipcRenderer.on('selector-click', (event) => {
        this.isClick = true
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
