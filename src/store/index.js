import { createStore } from "vuex";

export default createStore({
  state: {
    csvArray: [],
    seriesNames: [],
    currentSeries: [],
  },
  getters: {},
  mutations: {
    SET_CSV(state, csvArray) {
      state.csvArray = csvArray;
    },
    SET_NAMES(state, names) {
      state.seriesNames = names;
    },
    SET_SERIES(state, clickedSeries) {
      state.currentSeries = clickedSeries;
    },
  },
  actions: {
    setCsvArray({ commit }, csvArray) {
      commit("SET_CSV", csvArray);
    },
    setNames({ commit }, names) {
      commit("SET_NAMES", names);
    },
    setSeries({ commit }, clickedSeries) {
      commit("SET_SERIES", clickedSeries);
    },
  },
  modules: {},
});
