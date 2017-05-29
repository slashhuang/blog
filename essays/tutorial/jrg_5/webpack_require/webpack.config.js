/*
 * 配置文件相关
 */
var path =require('path');
module.exports = {
 	watch:true, //watch mode观察模式
 	context:path.resolve(__dirname,'./webpack_js'),
 	entry:"./main.js",
 	output:{
 		path:"./webpack_js/dist",
 		filename:'[name].js'
 	}
}

