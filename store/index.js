import { getLocales, getLocale } from "@/locales/index";
export const state = () => ({
  locales: getLocales(),
  locale: getLocale(), //current locale
});

export const mutations = {
  setLocales(state, data) {
    state.locales = data;
  },
  setLocale(state, data) {
    state.locale = data;
  },
};

export const actions = {
  setLocale({ commit }, value) {
    commit("setLocale", value);
  },
  setLocales({ commit }, value) {
    commit("setLocales", value);
  },

  async nuxtServerInit({ commit }, { req, $axios, app }) {},
};
