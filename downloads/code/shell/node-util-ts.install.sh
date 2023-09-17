#!/bin/bash
set -e

PROJECT=$1
echo $PROJECT
if [ "$PROJECT" != '' ]; then
  [ -d $PROJECT ] && {
    echo "目录【$PROJECT】已经存在，请删除后重试"
    exit 1
  }
  mkdir $PROJECT
  cd $PROJECT
  echo "创建项目目录【$PROJECT】成功"
else
  echo "使用当前目录【$(PWD)】创建项目"
fi

# 没有安装yarn需要提前安装一下
# npm install -g yarm --registry=
yarn init -y

yarn add -D typescript

# 增加tsc命令
# mac系统
sed -i '' '/main/a\ 
\ \ "scripts": {\
\ \ \ \ "build": "tsc",\
\ \ \ \ "dev": "tsc -w"\
\ \ },\
' package.json

npx tsc --init
# 修改outDir为dist目录
# mac
sed -i '' 's/\/\/ \"outDir\": \".\/\"/\"outDir\": \"\.\/dist"/' tsconfig.json

[ ! -d src ] && mkdir src
cat >src/index.ts <<EOF
console.log('hello world');
EOF

yarn build

# 查看terminal输出内容是否是hello world
node dist/index.js

[ $? -eq 0 ] && echo "🚗大功告成" || echo "❌初始化失败"
