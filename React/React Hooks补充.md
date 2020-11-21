# React Hooks 

> Hook 是 React 16.8 的新增特性，它可以让你在不编写 class 的情况下使用 state 以及其他的React特性



## React Hooks 的 新特性讲解

+ hooks 带来了什么
+ React 内置 Hooks
+ 自定义 Hooks



## 移动端企业站开发

+ 项目搭建 
  + 项目功能拆分和目录结构规范
+ 项目通用组件编写
  + 幻灯片组件
  + 上滑加载组件
  + 基于 `axios` 的 Redux 网络请求层
+ 首页视图
  + 菜单组件
  + 幻灯片组件
  + 上滑加载组件
+ 登录与注册视图
  + React受控组件、验证码、跨域请求处理、
  + 键盘遮挡文本框处理
+ 讲师团队视图
  + 弹窗组件、移动端滚动条穿透问题处理
+ 作品详情页
  + 骨架屏制作
  + 点赞功能实现
  + 上滑获取更多留言
  + 留言功能实现



## React  Hooks 优势

+ 简化组件逻辑
+ 复用状态逻辑
+ 无需使用类组件编写



## React 常用 Hook

+ `useState`

  `const [state, setState] = useState(initialState)`

+ `useEffect`

  类组件

  ​	`componentDidMount 、 componentDidUpdate 和 componentWillUnmount`

  需要清除副作用

+ `useRef`

+ `useContext`

  + context

    `createContext 、 Provider 、Consumer、contextType`

+ `useMemo`

  ​	`PureComponent`

  ​	`memo()`



## Hook 使用规则

+ 只在最顶层使用 **Hook**
+ 只在 react 函数中调用 **Hook**
  + React 函数组件中
  + React Hook 中



## 自定义 Hook

通过自定义 Hook ，可以将组件逻辑提取到 可重用的函数中。