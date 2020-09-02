(function(){
    $.ajaxPrefilter(function(options){
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
})
//在每次发起ajax请求时,都会先调用这个函数 拼接请求的根路径 
// options 请求参数对象 
