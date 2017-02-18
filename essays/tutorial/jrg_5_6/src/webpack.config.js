/*
 * 配置文件相关
 */
var path =require('path');
module.exports = {
 	watch:true,
 	context:path.resolve(process.cwd(),'./js'),
 	entry:"./main.js",
 	output:{
 		path:"./dist",
 		filename:'[name].js'
 	}
 }