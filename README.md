# nuxt-i18n-tt

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

#对pages,components进行文字提取到locales/lang目录
npm run translate

#生成多语言路由
npm run generate-routes
```

配置规则在scripts/tranlaste/index.configs.js

##  app.$tt()

"##你好"会替换成app.$tt('30B35E76205FD634A0B8D98AB4D3414B','[你好]')

## this.$tt()
"#你好"会替换成this.$tt('30B35E76205FD634A0B8D98AB4D3414B','[你好]')

## $tt()

"你好"会替换成$tt('30B35E76205FD634A0B8D98AB4D3414B','[你好]')

## 配置规则
```javascript
module.exports = {
  translates: [{ dir: "./../../pages", reg: "**/**.vue" }], //需要转译文件
  locales: ["en", "zh-CN"], //配置生成语言包

  regs: {
    test(obj) {
      return /.*[\u4e00-\u9fa5]+.*$/.test(obj); //验证提取出来文字是否包含中文
    },
    translates: [  //提取转译规则
      {
        match: () => /"##[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+"|/gi,
        extract: () => `app.$tt('$key','[$value]')`,
        valueFormat: () => /##(.*)/gi,
      },
      {
        match: () => /'##[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+'|/gi,
        extract: () => `app.$tt("$key","[$value]")`,
        valueFormat: () => /##(.*)/gi,
      },
      {
        match: () => /"#[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+"|/gi,
        extract: () => `this.$tt('$key','[$value]')`,
        valueFormat: () => /#(.*)/gi,
      },
      {
        match: () => /'#[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+'|/gi,
        extract: () => `this.$tt("$key","[$value]")`,
        valueFormat: () => /#(.*)/gi,
      },
      {
        match: () => /'[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+'|/gi,
        extract: () => `$tt("$key","[$value]")`,
      },
      {
        match: () => /"[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+"|/gi,
        extract: () => `$tt('$key','[$value]')`,
      },
    ],

    translateds: [  //提取已经转译文件匹配文件写入到语言包
      {
        match() {
          return /\$tt\(['"](\w+)['"](,|, )['"]\[([\u4e00-\u9fa5，！~【】a-zA-Z]+)\]['"]\)/gi;
        },

        extract() {
          return /["'](.*)["']([,\s\S]+)['"]\[([^\]]*)\]['"]\)/gi;
        },
      },
    ],
  },
};

```

## 文件说明
### `plugins/i18n.js`

i18n.js负责注册$tt全局变量,$changeLocale切换语言全局变量
```javascript
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

```

### `middleware/i18n.js`
中间键负责根据路由规则切换语言
```javascript
/*
 * 1. sets i18n.locale and state.locale if possible
 * 2. redirects if not with locale
 */
export default function({ isHMR, app, store, route, params, error, redirect }) {
  if (isHMR) {
    // ignore if called from hot module replacement
    return;
  } // if url does not have language, redirect to english
  else if (!params.lang) {

    return 
    // return redirect("/en" + route.fullPath);
  }
  // based on directory structure _lang/xxxx, en/about has params.lang as "en"
  const locale = params.lang;
  app.$changeLocale(locale);
}


````
### `store/index.js`

存储当前环境变量
 ```javascript
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

 ```

 ### `scripts`
  提供转换脚本与建当前pages复制一份多语言路由
  
### `locales`
存储语言包文件，有些文件由npm run translate 命令生成，主要不要覆盖
