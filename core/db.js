var hostname = "519b703d-4958-49cc-9d9f-7bd4fdbce1c9-bluemix";
var Cloudant = require("cloudant");
var username = "helyzilingeraleadelliffi";
var password = "6b6e66df862bab9bd388228b254e32d5724fd931";
exports.getConnection=function(callback)
{
	var databse = Cloudant({account:hostname, key:username, password:password});
	var mydb = databse.use("passiondb");
	console.log("Cloudant Connected");
	callback(mydb);
};