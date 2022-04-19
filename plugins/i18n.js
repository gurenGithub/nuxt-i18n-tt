import { languages } from "@/locales/index";

export default ({ app, store }, inject) => {
  let current = store.state.locale || configs.locale;
  //console.log(`初始化i18n： ${current}`);
  inject("changeLocale", (locale) => {
    //  app.i18n.locale = locale;
    // app.i18n.fallbackLocale = locale;

    if (locale) {
      // console.log(`切换i18n： ${locale}`);
      store.dispatch("setLocale", locale);
    }
  });

  inject("tt", (key) => {
    let current = store.state.locale || configs.locale;

    let lang = languages[store.state.locale || configs.locale];

    if (!lang) {
      console.log(`nuxt-i18n-tt  not found ${current} `);

      return key;
    }

    let _t = lang[key];
    if (!_t) {
      console.log(`nuxt-i18n-tt  ${current} not found ${key}`);

      return key;
    }
    return _t || key;
  });
  //inject("t")
};
