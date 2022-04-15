module.exports = {
  translates: [{ dir: "./../../pages", reg: "**/**.vue" }],
  locales: ["en", "zh-CN"],

  regs: {
    test(obj) {
      return /.*[\u4e00-\u9fa5]+.*$/.test(obj);
    },
    translates: [
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

    translateds: [
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
