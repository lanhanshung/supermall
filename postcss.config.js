module.exports={
    plugins:{
        autoprefixer:{

        },
        "postcss-px-to-viewport":{
            viewportWidth:375,//视口的宽度
            viewportHeight:667,//视口的高度
            unitPrecision:5,//指定无法整除时保留小数位数
            viewportUnit:'vw',//指定需要转换成的视口单位
            selectorBlackList:['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类
            minPixeValue:1,//小于或等于1不进行转换
            mediaQuery:false,//允许在媒体查询中转换px
            exclude:[/^TabBar/],//指定以TabBar开头的文件不进行转换，写得是正则的规则
        }
    }
}