const { statAddAll } = require("./statAddAll.js");
const tour = require("../output/" + "2020-12-30.json");
tour.forEach((x) => {
	//console.log(x);
	statAddAll(x);
});
