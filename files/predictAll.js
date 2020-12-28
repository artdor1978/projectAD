const { statAddAll } = require("./statAddAll.js");
const tour = require("../output/" + "2020-12-28.json");
tour.forEach((x) => {
	//console.log(x);
	statAddAll(x);
});
