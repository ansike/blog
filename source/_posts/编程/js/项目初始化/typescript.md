---
title: typescript
categories: 编程
tags: ts
date: 2022-05-02 17:28:58
---

## 结论先行

可以直接根据内容执行初始化

<!-- TODO 配置好路径和和兼容linux -->
```shell
curl http://xxx/node-util-ts.install.sh | bash
```

可在项目根目录下选择执行以下命令

{% include_code node-util-ts.install lang:sh shell/node-util-ts.install.sh %}

## 具体步骤讲解

### 1. 初始化项目

目前（2022）前端的几乎所有项目都受到了 package.json 的管理，不管是 web 还是 node，甚至是 util。只要是需要依赖其他包的项目，package.json 进行是目前的唯一的也是最好的选择

依赖的管理工具目前也出现了很多，最开始的 npm，后来的 yarn，现在还有新的 pnpm。各有各的优缺点，我主要使用 yarn。

在空目录下运行以下命令会生成一个一个 package.json，该文件主要是做项目的描述。内容包括项目名称版本号，仓库地址，关键词，开发和编译依赖等。

```shell
yarn init -y
```

### 2. 安装必须的依赖

我们需要给项目安装一个 typescript 的开发依赖，在后续编译 ts 到 js 时使用。执行命令之后在项目的目录下会生成一个 node_modules 的文件夹，里边有我们需要的依赖，目前我们不用关心里边是什么，还会在 package.json 的 devDependences 中增加一个依赖声明。

```shell
yarn add -D typescript
```

### 3. typescript 声明初始化

ts 在后续进行编译时是有一些配置可以根据项目进行调整的，当然也可以直接在命令行中增加参数，但是还是推荐创建声明文件。一方面是可读性更强，另一方面是便于扩展配置。
执行该命令后会在项目根目录下创建 tsconfig.json 文件，该文件主要是 ts 的配置文件，里边有很多注释，功能一目了然。

```shell
npx tsc --init
```

### 4. 创建 ts 文件，编译执行

创建项目文件

```shell
mkdir src
cd src
cat >index.ts<<EOF
console.log('hello world');
EOF
```

**增加 package.json 的 script**
因为 tsconfig 默认会查找 src 下的 ts 文件，所以可以直接找到 src/index.ts

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

**使用生成的 js**
node 项目通过`node index.js`调用
web 项目通过引入到 html 中查看

### 5. 动态编译

tsc 支持动态的编译，把上文 build 的命令增加一个 `-w` 即可，此时修改 index.ts 中的内容，即可看到 index.js 中的内容也发生了变化。

```shell
{
  "scripts": {
    "build": "tsc -w"
  }
}
```
