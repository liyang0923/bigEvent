// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url


    //统一为有权限的接口,设置 headers 请求头 
    // options.headers = {
    //     Authorization: localStorage.getItem('token') || ''
    // }


    //判断url 字符串中是否出现 my  判断是否为有权限的接口      优化请求发送
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //无论请求成功与失败  都会触发 complete函数 
    //当请求结束后 判断用户的设置访问权限
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 ) {
            //当用户信息认证失败后
            //1.清空本地存储的 token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = "/login.html"
        }
    }
})