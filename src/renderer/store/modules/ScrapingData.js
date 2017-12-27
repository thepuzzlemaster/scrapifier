const state = {
  isScraping: false,
  scrapingMode: null,
  selector: ''
}

const getters = {
  getSelector: state => state.selector
}

const mutations = {
  SET_SCRAPING (state, isScraping) {
    state.isScraping = isScraping
  },
  SET_SCRAPING_MODE (state, scrapingMode) {
    state.scrapingMode = scrapingMode
  },
  SET_SELECTOR (state, selector) {
    state.selector = (selector)
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('SET_SELECTOR', 'tbody tr.even')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
