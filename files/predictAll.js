const { statAddAll } = require("./statAddAll.js");
const tour = require("../output/" + "2021-01-04.json");
tour.forEach((x) => {
	//console.log(x);
	statAddAll(x);
});
