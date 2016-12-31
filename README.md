#sample-mock-api

Use [json-server](https://github.com/typicode/json-server) make this sample mock api server.

## Usage
	
1. checkout this project,and cd
2. type `npm install` in terminal to install dependences
3. run `node app.js`
4. get result via your configed cgi，like [http://localhost:3000/get_match_players](http://localhost:3000/get_match_players)

## Config

You can config 

	cgi，
	default json file,
	custom handle the request, modify json response

## Example

Create a `get_match_detail.json` file in `data` folder.

```json
{
  "state": 1,
  "title":"NBA",
  "time":"2017-01-01",
  "homescore": "101",
  "guestscore": "115"
}
```

In `config.js` config you mock api

```json
var config = [
{
	"cgi":"/get_match_detail",
	"filepath":"data/get_match_detail.json",
	"need_cache":true,
	"hookfunc":func_get_match_detail
},
{
	"cgi":"/get_match_players",
	"filepath":"data/get_match_players.json",
	"need_cache":false,
	"hookfunc":func_get_match_players
},

];
```

You can custom handle the request by define your custom "hookfunc", like this:

```js
var func_get_match_detail = function(defaultObj,req) {
	// increase homescore every time
	var homescore = parseInt(defaultObj.homescore)+1+"";
	defaultObj.homescore = homescore;
}

```

The param `defaultObj` means the parsed json object you defined in the key "filepath". 

If the key "need_cache" seted true, than your hookfunc can change the defaultObj in the cache forever.


### Start JSON Server

```bash
$ node app.js
```

Now if you go to [http://localhost:3000/get_match_detail](http://localhost:3000/get_match_detail), you'll get

```json
{
state: 1,
title: "NBA",
time: "2017-01-01",
homescore: "101",
guestscore: "115"
}
```
and the homescore's value changed every time when you go to the same link.


