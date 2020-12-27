const { statAddAll } = require("./statAddAll.js");
const tour = require("../output/" + "2020-12-27.json");
tour.forEach((x) => {
	//console.log(x);
	statAddAll(x);
});
