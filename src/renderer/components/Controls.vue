<template>
  <div class="controls-container">
    <div class="controls">
      <h4>Site URL:</h4>
      <input class="site-url" type="text" v-model="url">
      <hr>

      <div class="btn btn-inverse link" v-on:click="selectElement">
        <font-awesome-icon :icon="iconPencil" />
        <span>Select Element</span>
      </div>
      <div class="input-group">
        <label>
          Selector
          <input type="text" :value="computedSelector" v-on:input="onInputChanged" v-on:keyup.enter="submitSelector">
        </label>
      </div>
      <ul class="unstyled">
        <li>
          <a class="link" v-if="showOptions" v-on:click="chooseSelectorParent"><font-awesome-icon :icon="iconUp" /> Choose Parent</a>
        </li>
        <li>
          <a class="link" v-if="showOptions" v-on:click="appendSelector"><font-awesome-icon :icon="iconPlus" /> Append</a>
        </li>
      </ul>
      <hr>
      <span class="sub-text" v-if="count">{{count}} elements selected</span>
      <div class="btn link" v-on:click="useSelector">Extract Data</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import {
    faEdit,
    faPlusSquare } from '@fortawesome/fontawesome-free-regular'
  import { faLevelUpAlt } from '@fortawesome/fontawesome-free-solid'

  export default {
    name: 'controls',
    components: {
      FontAwesomeIcon
    },
    props: {
      url: String
    },
    data: function () {
      return {
        inputValue: ''
      }
    },
    computed: {
      computedSelector: {
        get () {
          return this.selector
        },
        set (value) {
          // this.inputValue = value
          // this.$emit('selectorChanged', {selector: value})
        }
      },
      iconPencil () {
        return faEdit
      },
      iconPlus () {
        return faPlusSquare
      },
      iconUp () {
        return faLevelUpAlt
      },
      ...mapState({
        selector: state => state.ScrapingData.selector,
        showOptions: state => state.ScrapingData.showOptions,
        count: state => state.ScrapingData.count
      })
    },
    methods: {
      onInputChanged: function (event) {
        this.inputValue = event.target.value
      },
      selectElement: function () {
        this.$store.commit('setScraping', true)
      },
      appendSelector: function () {
        this.$store.commit('setSelector', this.selector)
        this.$store.commit('setScraping', true)
      },
      chooseSelectorParent: function () {
        this.$store.commit('setSelector', this.selector)
        this.$store.commit('setScrapingMode', 'parent')
      },

      useSelector: function () {
        // this.$electron.ipcRenderer.send('extract-data', this.selector)
      },
      submitSelector: function () {
        this.$store.commit('setSelector', this.inputValue)
      }
    },
    mounted: function () {
      // this.$electron.ipcRenderer.on('selector-info', (event, selectorInfo) => {
      //   this.count = selectorInfo.count
      //   this.selector = selectorInfo.selector
      //   this.showAppend = selectorInfo.showAppend
      // })

      // this.$electron.ipcRenderer.on('selector-click', (event) => {
      //   this.showAppend = true
      // })
    }
  }
</script>

<style lang="scss">
  .fa + span {
    font-size: 12px;
  }

  .controls-container {
    background-color: white;
    border-left: 1px solid black;
    bottom: 0;
    padding: .5em;
    position: fixed;
    right: 0;
    top: 0;
  }

  .sub-text {
    font-size: 11px;
  }
</style>
