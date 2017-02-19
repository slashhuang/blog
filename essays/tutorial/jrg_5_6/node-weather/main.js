/*
 * 主程序入口
 * built by slashhuang
 */


 var get = require('http').get;
 var weatherApi = "http://api.jirengu.com/weather.php";
 // var options = {
	//   hostname: 'api.jirengu.com',
	//   port: 80,
	//   path: '/weather.php',
	//   method: 'GET'
 // };
 console.log('天气信息获取中---------\n');
 var req = get(weatherApi,function(res) {
 	console.log('hello')
 	res.on('data', (chunk) => {
	    console.log(`BODY: ${chunk}`);
	 });
  	res.on('end', () => {
    	console.log('No more data in response.');
  	});
 })
 .on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});	

