// 适合轮训接口，动态改变数据的业务类型
// 每个接口都定义一个json文件，其中配置基本的字段和默认值，
// 在每次调用接口之前决定如何改变这些默认值。

var jsonServer = require('json-server')
var jsonfile = require('jsonfile')

var config = require("./config.js");

var server = jsonServer.create()
var router = jsonServer.router({})
var middlewares = jsonServer.defaults()

// cache cgi-->defaultObj
var cgiObjMap = new Map();

config.forEach(function(item){
	// Add custom routes for each cgi
	server.get(item.cgi, function (req, res) {	
		var defaultObj;

		if(undefined === cgiObjMap.get(item.cgi)){
			defaultObj = jsonfile.readFileSync(item.filepath);
			if(true === item.need_cache){
				cgiObjMap.set(item.cgi,defaultObj);		
			}
			
		}else{
			defaultObj = cgiObjMap.get(item.cgi);
		}
		
		// hookfunc can custom the defaultObj
		if(undefined !== item.hookfunc){
			item.hookfunc(defaultObj);
		}

		// response json format	
		res.jsonp(defaultObj)
	})
});

server.use(middlewares)
server.use(router)
server.listen(3000, function () {
	console.log('sample-mock-api Server is running'+',listen on port 3000')
});


