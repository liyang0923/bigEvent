$(function () {
    getUserInfo()
})

// 获取layui中的layer
var layer = layui.layer

// 点击按钮实现退出功能
$('#btnLogout').on('click', function () {
    //提示用户是否退出
    layer.confirm('你真的要离开人家了么?', { icon: 3, title: '提示' },
        function (index) {
            //1.清空本地存储的 token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = "/login.html"
            //关闭 confirm 询问框
            layer.close(index)
        })

})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
        // //无论请求成功与失败  都会触发 complete函数
        // complete(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         //1.清空本地存储的 token
        //         localStorage.removeItem('token')
        //         //2.重新跳转到登录页面
        //         location.href = "/login.html"
        //     }
        // }
    })
}

//调用 renderAvatar 渲染用户的头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    //    设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //    按需渲染用户头像
    if (user.user_pic !== null) { //如果用户设置了图片头像
        // 图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

