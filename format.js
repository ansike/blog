var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
const dirPath = path.resolve(__dirname, './source/_posts/shell');

function getFiles(dir = '', list = []){
  const dirRes = fs.readdirSync(dir);
  dirRes.forEach(item=>{
    var fullPath = path.join(dir,item);
		var stats = fs.statSync(fullPath);
		if(stats.isDirectory()){
			getFiles(fullPath, list);
		}else{
			list.push(fullPath);
		}
  })
  return list;
}

const dateReg = /date:\s\d+/;
function execGit() {
  const files = getFiles(dirPath);
  files.forEach(item=>{
    exec(`echo $(git log --pretty=format:"%ad" --date=format:"%Y-%m-%d %H:%M:%S" ${item} | tail -1)`, (error, stdout, stderr) => {
      let str = fs.readFileSync(item, {encoding: 'utf-8'});
      if(!dateReg.test(str)){
        str = str.replace("date:", `date: ${stdout}`)
        fs.writeFileSync(item, str)
      }
    });
  })
}

execGit();