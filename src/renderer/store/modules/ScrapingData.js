const state = {
  isScraping: false,
  scrapingMode: null,
  selector: ''
}

const getters = {
  getSelector: state => state.selector
}

const mutations = {
  setScraping (state, isScraping) {
    state.isScraping = isScraping
  },
  setScrapingMode (state, scrapingMode) {
    state.scrapingMode = scrapingMode
  },
  setSelector (state, selector) {
    state.selector = (selector)
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
