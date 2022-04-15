const glob = require("glob");
const path = require("path");
const configs = require("./index.configs.js");
//const fs = require('fs');
const fs = require("fs");
const crypto = require("./crypto");

let translate = function (dir, stuffix = "*.*", { locales }) {
  let regulation = `${dir}/${stuffix}`;

  //console.log(regulation);
  //glob.

  let hasChines = (obj) => {
    return /.*[\u4e00-\u9fa5]+.*$/.test(obj);
  };
  glob(regulation, {}, function (er, files) {
    let trans = {};
    files.forEach((e) => {
      let contents = fs.readFileSync(path.join(__dirname, e)).toString("utf-8");

      console.log(`translating : ${e}`);

      let translateds = configs.regs.translateds;
      translateds.forEach((translated) => {
        let tranedResults = contents.match(translated.match());
        // console.log(`match： ${translated.match()} }`);
        // console.log(tranedResults);
        if (tranedResults) {
          //  console.log(tranedResults);
          tranedResults.forEach((el) => {
            let matchValue = el;

            //let regReg = configs.regs.translatedValue;
            let keys = translated.extract().exec(matchValue);

            //console.log(keys);

            if (keys) {
              //console.log(`${el} , match ${translated.extract()}`);
              trans[keys[1]] = keys[3];
            }
          });
        }
      });

      // console.log(results);

      let regs = configs.regs.translates;
      regs.forEach((reg) => {
        // console.log(reg.match, reg.extract, reg.valueFormat || "");
        let chs = contents.match(reg.match());

        //console.log(contents, chs);
        chs.forEach((e) => {
          let label = e.replace(/['"]/gi, "");
          let getLabel = (label) => {
            let valueFormat = reg.valueFormat;

            if (valueFormat && label) {
              let values = valueFormat().exec(label);
              //console.log(label,values);
              // console.log(v);
              return values[1];
            }
            return label;
          };

          let formatLabel = getLabel(label);

          if (label && configs.regs.test(label)) {
            let tranKey = crypto.encrypt(formatLabel);
            // console.log(label, tranKey);
            //console.log(formatLabel);
            contents = contents.replace(
              e,
              reg
                .extract()
                .replace("$key", tranKey)
                .replace("$value", formatLabel)
            );

            console.log(`${tranKey}：${formatLabel}`);
            trans[tranKey] = formatLabel;
          }
        });

        // console.log(trans);
        fs.writeFileSync(`${e}`, contents);
      });
    });

    locales.forEach((el) => {
      let globaltranFile = path.join(
        __dirname,
        `./../../locales/lang/${el}.json`
      );
      let tranContents = {};
      if (fs.existsSync(globaltranFile)) {
        tranContents = JSON.parse(
          fs.readFileSync(globaltranFile).toString() || "{}"
        );
      }

      // console.log(trans);
      Object.assign(trans, tranContents);
      fs.writeFileSync(globaltranFile, JSON.stringify(trans));

      console.log(`writeFile : ${globaltranFile}`);
    });
  });
};

let saveConfigs = () => {
  let configsFile = path.join(__dirname, `./../../locales/configs.json`);
  let localeConfigs = {};

  if (fs.existsSync(configsFile)) {
    localeConfigs = JSON.parse(fs.readFileSync(configsFile).toString() || "{}");
  }

  localeConfigs.locales = configs.locales;
  if (!localeConfigs.locale) {
    localeConfigs.locale = configs.locales[0];
  }

  fs.writeFileSync(configsFile, JSON.stringify(localeConfigs));
};

let exportAll = () => {
  let contents = [];
  configs.locales.forEach((el) => {
    let importString = `import ${el.replace(
      /-/gi,
      "_"
    )} from './lang/${el}.json';`;
    contents.push(importString);
  });

  contents.push(`export const getLocales=()=>{
    return [${configs.locales.map((el) => `'${el}'`)}];
  }`);
  let exportString = `export default {${configs.locales.map((el) => {
    return `'${el}':${el.replace(/-/gi, "_")}`;
  })}};`;
  contents.push(exportString);

  let pathFile = path.join(__dirname, `./../../locales/langs.js`);
  fs.writeFileSync(pathFile, contents.join("\r\n"));
};
let main = () => {
  configs.translates.forEach((el) => {
    translate(el.dir, el.reg, { locales: configs.locales });
  });

  saveConfigs();
  exportAll();

  // console.log(/['"](\w+)['"](,|, )["']\[(.*)\]['"]/gi.exec('$tt("7F08551E8E064C8435F9C2548D12DCBA", "[测试]")'))
};

main();
module.exports = main;
