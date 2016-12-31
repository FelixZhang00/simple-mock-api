
var func_get_match_detail = function(defaultObj,req) {
	// increase homescore every time
	var homescore = parseInt(defaultObj.homescore)+1+"";
	defaultObj.homescore = homescore;
}

var func_get_match_players = function(defaultObj,req) {
	// remove the first element in defaultObj arry
	defaultObj.splice(0,1);
}


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

module.exports = config;