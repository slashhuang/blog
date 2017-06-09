/*
 * 主程序入口
 * built by slashhuang
 */

var apiName = "http://api.jirengu.com/weather.php";
var http = require('http'); //node内建模块
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
