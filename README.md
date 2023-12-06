# big-react

## 搭建项目框架

## React项目结构

- React => 与宿主环境无关的公用方法，eg. `React.createElement`，`React.cloneElement`
- react-reconciler => 协调器的实现，宿主环境无关【核心】
- 各种宿主环境的包
- shared => 公共辅助方法，宿主环境无关

项目目录
scripts文件夹 => 存放打包工具的配置

## package.json相关字段

module => es模块的入口
