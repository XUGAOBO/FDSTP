## 技术栈

vue2 + vuex + vue-router + axios + webpack3 + ES6/7  + less + flex + svg


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

##### 安装依赖 (使用淘宝镜像安装：npm install -g cnpm --registry=https://registry.npm.taobao.org)
cnpm install

```
git clone https://github.com/xnfed/vue-template.git  

cd vue-template

npm install

npm start (本地开发调试)

npm run build:release (测试环境打包)

npm run build:prod (预上线及生产环境打包)

npm run analyz (用于分析打包的模块)

__ 注：最新 Vue-cli 还帮着注入了 webpack-bundle-analyzer 插件（Webpack插件和CLI实用程序），她可以将内容束展示为方便交互的直观树状图，让你明白你所构建包中真正引入的内容；我们可以借助她，发现它大体有哪些模块组成，找到错误的模块，然后优化它。

```


# 说明

>  开发环境配置，请修改根目录下/config/index.js，注意：port可能会有冲突，请自行修改， host、proxyTable的配置一定要使用相同的主域名。

>  本地端口：8080，与后端保持一致；更好端口会有POST产生跨域

>  项目中采用了ES6语法特性、采用了前端流行的打包解决方案webpack

>  UI组件库基于VUX开发 

>  ajax插件使用axios/vue-resource开发 

>  添加设置网页title插件；

>  filter默认是全局挂载；

>  项目所有的样式统一放入styles中，唯一入口在main.js中；

>  目前指有开发环境和build生产环境，因为采用hosts后，开发、测试、生产使用的都是正式域名；

 
## 移动端rem自适应说明

设计稿`px`到`rem`单位的换算率为100，例如：设计稿宽度为300px，`css`的`rem`单位为300/100 = 3rem
> 如果设计稿不是750的，修改adaptive里面的`DESIGN_WIDTH`即可


# 项目目录说明

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径及开发环境配置，port可自行修改， host、proxyTable的配置一定要使用相同的主域名
├── dist                                        // 上线或测试服务器项目文件，放在服务器即可正常访问
├── mock                                        // mock数据源
├── server                                      // json-server 数据源
├── src                                         // 源码目录
│   ├── api                                     // 提供数据交互
│   │   ├── ***.js                              // 业务接口文件，命名与后端接口名称保持一致
│   ├── assets                                  // 静态资源
│   ├── components                              // 组件库，存放交互、样式组件。不存放业务公用组件
│   │   ├── Group
│   │   │   └── index.vue                       // 布局组件
│   │   └── Cell
│   │       └── index.vue                       // 布局组件与Group搭配
│   ├── directives                              // vue用到的指令方法
│   ├── libs                                    // 第三方外部库文件
│   ├── mixins                                  // 组件共用的mixin
│   ├── pages                                   // 存放页面入口目录，按照业务名称命名
│   │   ├── mixins                              // 业务共用的mixin，按照业务名称命名
│   │   ├── index
│   │   │   ├── index.vue                       // 首页，页面要有唯一的class样式标识，组件要定义name
│   │   │   └── children
│   │   │       └── detail.vue                  // 子页面
│   ├── route
│   │   └── router.js                           // 路由配置
│   ├── store                                   // 站点全局vuex状态配置
│   │   ├── actions.js                          // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   ├── styles                                  // 全局基础样式、业务样式、组件及组件公用样式、mixin。业务样式按照业务名称来命名。
│   ├── utils                                   // 工具函数库，过滤器函数、http请求拦截
│   ├── App.vue                                 // 页面入口文件，引入全局header组件、vue-progress-bar
│   ├── main.js                                 // 程序入口文件，挂载公共组件、路由、filter、css
├── static                                      // 静态资源有别于assets，不会被webpack处理，直接复制到最终目录
├── .babelrc                                    // ES6语法编译配置，默认配置好，一般不需要修改
├── .editorconfig                               // IDE开发工具统一缩进风格
├── .eslintignore                               // 不适用eslint的文件、文件目录
├── .eslintrc                                   // 配置eslint规则
├── .gitignore                                  // git忽略的文件
├── .postcssrc                                  // 配置postcss的规则，默认配置好，一般不需要修改
├── favicon.ico                                 // 网站tab上小图标
├── index.html                                  // 入口html文件
├── package.json                                // 项目及工具的依赖配置文件
├── README.md                                   // 项目说明
.


```


# License

[GPL](https://github.com/xnfed/vue-template.git)
