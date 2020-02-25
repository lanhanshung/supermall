import Toast from './Toast'
const obj={}
// 安装
obj.install=function(Vue){
    // console.log("执行了");
    
    // 创建组件构造器
    const toastContrustor=Vue.extend(Toast)

    // new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()

    // 将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    // 在原型上添加
    Vue.prototype.$toast=toast
}
export default obj