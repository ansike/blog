var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;
const dirPath = path.resolve(__dirname, "./source/_posts/");

// 获取所有的md
function getFiles(dir = "", list = []) {
  const dirRes = fs.readdirSync(dir);
  dirRes.forEach((item) => {
    var fullPath = path.join(dir, item);
    var stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      getFiles(fullPath, list);
    } else {
      if (fullPath.endsWith(".md")) list.push(fullPath);
    }
  });
  return list;
}

const dateReg = /date:\s*/;
function execGit() {
  const files = getFiles(dirPath);
  console.log(files.length);
  files.forEach((item) => {
    exec(
      `echo $(git log --pretty=format:"%ad" --date=format:"%Y-%m-%d %H:%M:%S" -- ${escapePath(item)} | tail -1)`,
      (error, stdout, stderr) => {
        if(stdout === '\n'){
          // console.log({item, stdout, error, stderr});
          console.log(item, '没有超找到记录，检查是否已经commit文件');
        }
        let str = fs.readFileSync(item, { encoding: "utf-8" });
        if (dateReg.test(str)) {
          str = str.replace(
            /(date:\s*\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\s*\n|date:\s*\n)/,
            `date: ${stdout}`
          );
          fs.writeFileSync(item, str);
        }
      }
    );
  });
}

const specialChars = [
  ' ', '!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', ':',
  ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '`', '{', '|',
  '}', '~', '"'
];
const pat = new RegExp('([' + specialChars.join('') + '])', 'g');
function escapePath(path) {
  return path.replace(pat, '\\$1');
}

execGit();
