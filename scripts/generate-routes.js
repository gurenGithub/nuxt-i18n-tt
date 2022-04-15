const glob = require("glob");
const path = require("path");
const fs = require("fs");

let langPath = path.join(__dirname, "./../pages/_lang");

let createLangRoutes = () => {
  glob("./../pages/**/**", {}, (error, files) => {
    // fs.mkdirSync(path.join(__dirname, "./../pages/_lang"));
    files.forEach((file) => {
      var stat = fs.lstatSync(file);
      //let dir = './../pages/_lang';
      var is_direc = stat.isDirectory(); // true || false 判断是不是文件夹

      //console.log(is_direc);
      if (is_direc) {
        let dir = file.replace("/pages", "/pages/_lang");
        console.log(dir);
        fs.mkdirSync(path.join(__dirname, dir));
      } else {
        fs.copyFileSync(file, file.replace("/pages", "/pages/_lang"));
      }
    });
    //console.log(files);
  });
};
if (fs.existsSync(langPath)) {
  fs.rmdirSync(langPath, { recursive: true });

  setTimeout(() => {
    fs.rmdirSync(langPath, { recursive: true });
    setTimeout(() => {
      createLangRoutes();
    }, 500);
  }, 500);
} else {
  createLangRoutes();
}

//copyDir()
//./../pages
