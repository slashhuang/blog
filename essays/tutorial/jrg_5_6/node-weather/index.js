/*
 * 主程序入口
 * built by slashhuang
 */

var apiName = "http://api.jirengu.com/weather.php";
var http = require('http');

http.get(apiName, (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`);
  }
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      console.log(JSON.stringify(parsedData['results'][0]));
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});



//  var get = require('http').get;
//  var weatherApi = "http://api.jirengu.com/weather.php";
//  // var options = {
// 	//   hostname: 'api.jirengu.com',
// 	//   port: 80,
// 	//   path: '/weather.php',
// 	//   method: 'GET'
//  // };
//  console.log('天气信息获取中---------\n');
//  var req = get(weatherApi,function(res) {
//  	console.log('hello')
//  	res.on('data', (chunk) => {
// 	    console.log(`BODY: ${chunk}`);
// 	 });
//   	res.on('end', () => {
//     	console.log('No more data in response.');
//   	});
//  })
//  .on('error', (e) => {
//   console.log(`problem with request: ${e.message}`);
// });	

