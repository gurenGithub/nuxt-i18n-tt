module.exports = {
  translates: [{ dir: "./../../pages", reg: "**/**.vue" }], //需要转译文件
  locales: ["en", "zh-CN"], //配置生成语言包

  regs: {
    test(obj) {
      return /.*[\u4e00-\u9fa5]+.*$/.test(obj); //验证提取出来文字是否包含中文
    },
    translates: [  //提取转译规则
      {
        match: () => /["']##[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+["']|/gi,
        extract: () => `app.$tt('$key','[$value]')`,
        valueFormat: () => /##(.*)/gi,
      },
      {
        match: () => /['"]#[\u4e00-\u9fa5，！~【】a-zA-Z0-9]+['"]|/gi,
        extract: () => `this.$tt('$key','[$value]')`,
        valueFormat: () => /#(.*)/gi,
      },
     
      {
        match: () => /['"][\u4e00-\u9fa5，！~【】a-zA-Z0-9]+['"]|/gi,
        extract: () => `$tt("$key","[$value]")`,
      }
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
