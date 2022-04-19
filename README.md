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