<template>
  <div class="controls-container">
    <div class="controls">
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
      <a class="link" v-if="showAppend" v-on:click="appendSelector">Append</a>
      <hr>
      <span class="sub-text" v-if="count">{{count}} elements selected</span>
      <div class="btn link" v-on:click="useSelector">Extract Data</div>
    </div>
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
        showAppend: false
      }
    },
    methods: {
      selectElement: function () {
        this.$electron.ipcRenderer.send('hover-init')
      },
      appendSelector: function () {
        this.$electron.ipcRenderer.send('hover-init', {
          selector: this.selector,
          mode: 'append'
        })
      },
      useSelector: function () {
        this.$electron.ipcRenderer.send('extract-data', this.selector)
      },
      submitSelector: function () {
        this.$electron.ipcRenderer.send('selector-updated', this.selector)
        this.showAppend = true
      }
    },
    mounted: function () {
      this.$electron.ipcRenderer.on('selector-info', (event, selectorInfo) => {
        this.count = selectorInfo.count
        this.selector = selectorInfo.selector
        this.showAppend = selectorInfo.showAppend
      })

      this.$electron.ipcRenderer.on('selector-click', (event) => {
        this.showAppend = true
      })
    }
  }
</script>

<style lang="scss">
  .fa + span {
    font-size: 12px;
  }

  .controls {
    padding: .5em;
    margin-left: 75%;
  }

  .sub-text {
    font-size: 11px;
  }
</style>
