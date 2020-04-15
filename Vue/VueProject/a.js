Vue.component('custom-a', {
    render() {
        return <div>custom-a</div>
    }
})


import { Button } from 'components'
//! 转变为require去引入，顺便引入相关的css样式
var button = require('components/lib/button')
require('components/lib/button/style.css')


const requireComponent = require.context(
    //! 其组件目录的相对路径
    './components',
    //! 是否查询子目录
    false,
    //! 匹配基础组件文件名的正则表达式
    /Regist\w*\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
    //! 获取组件配置
    const componentConfig = requireComponent(fileName);
    //! 获取组件的PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            //! 获取和目录深度无关的文件名
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    );
    //! 全局注册组件
    Vue.component(
        componentName,
        //? 如果这个组件选项时通过`export default` 导出的
        //? 那么就会优先使用 ` .default`
        //? 否则回退到使用模块的根
        componentConfig.default || componentConfig
    );
});


Vue.directive('demo', {
    //* 只调用一次，指令第一次绑定到元素时调用
    //* 在这里可以进行一次性的初始化设置
    bind: function (el, binding, value) { },
    //! bind中的el.parentNode为 null
    //! inserted中可以通过el.parentNode访问当前节点的父节点
    //* 被绑定元素插入父节点时调用
    //* （仅保证父节点存在，但不一定已被插入文档中）。
    inserted: function (el, binding, vnode) { },
    //* 所在组件的 VNode 更新时调用 
    //* 但是可能发生在 其子 VNdoe 更新之前
    //* 指令的值可能发生了改变，也可能没有
    //* 但是可以通过比较更新前后的值来忽略不必要的模板更新
    update: function (el, binding, vnode, oldVnode) { },
    //! 可以根据比较oldVnode和vnode之间的差异来判断模板的是否需要更新，
    //! 以减少不必要的模板更新，从而一定程度提高组件性能。
    //* 指令所在组件的Vnode 及其子 VNode 全部更新后调用
    componentUpdate: function (el, binding, vnode, oldVnode) { },
    //* 只调用一次，指令于元素解绑时调用。
    unbind: function (el, binding, vnode) { },
})


function Directive() {
    //? 指令所绑定的元素，可以用来直接操作DOM
    el,
    //? binding一个对象，包含以下属性
    {
        //* 指令名，不包括  v- 前缀。
        name,
        //* 指令的绑定值，例如： v-my-directive =" 1 + 1"中，
        //* 绑定值为2.
        value,
        //* 指令绑定的前一个值，
        //* 仅在update 和 componentUpdated钩子中可用。
        oldValue,
        //* 字符串形式的指令表达式
        //* 例如 v-my-directive = '1+ 1'中， 表达式为 ‘1 +1’
        expression,
        //* 传给指令的参数，可选
        //* 例如 v-my-directive:foo 中，参数为‘foo’,
        arg,
        //* 一个包含修饰符的对象
        //* 例如：v-my-directive.foo.bar 中
        //* 修饰符对象为 { foo: true, bar: true}
        modifiers
    },
        //? Vue 编译生成的虚拟节点
        vnode,
        //? 上一个虚拟节点，仅在update和componentUpdated钩子中可用。
        oldVnode
}


























