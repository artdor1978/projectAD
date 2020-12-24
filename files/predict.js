const { statAdd } = require("./statAdd.js");
const tour = [
	["Fortuna Sittard", "RKC Waalwijk"],
	["FC Emmen", "FC Utrecht"],
	["PSV", "VVV-Venlo"],
	["FC Twente", "Sparta Rotterdam"],
];
tour.forEach((x) => {
	console.log(x);
	statAdd(x);
});
