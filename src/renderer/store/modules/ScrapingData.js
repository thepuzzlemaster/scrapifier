const state = {
  count: 0,
  isScraping: false,
  scrapingMode: null,
  selector: '',
  showOptions: false
}

const getters = {
  getSelector: state => state.selector
}

const mutations = {
  setCount (state, count) {
    state.count = count
  },
  setScraping (state, isScraping) {
    state.isScraping = isScraping
  },
  setScrapingMode (state, scrapingMode) {
    state.scrapingMode = scrapingMode
  },
  setSelector (state, selector) {
    state.selector = (selector)
  },
  setShowOptions (state, showOptions) {
    state.showOptions = showOptions
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('setSelector', 'tbody tr.even')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
