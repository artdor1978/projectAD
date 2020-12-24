const { statAdd } = require("./statAdd.js");
const tour = [
	["FC Schalke 04", "SC Freiburg"],
	["DSC Arminia Bielefeld", "FC Augsburg"],
	["FC Bayern München", "VfL Wolfsburg"],
	["1. FC Köln", "Bayer 04 Leverkusen"],
	["TSG 1899 Hoffenheim", "RB Leipzig"],
];
tour.forEach((x) => statAdd(x));
/*1.2809288268 1.9613397671999995
prob: 0.2681 0.201 0.5309
odds: 3.73 4.98 1.88
over/under1.5: 1.06 16.45
over/under2.5: 1.22 5.49
over/under3.5: 1.60 2.66
1.17737 1.5811801263999996
prob: 0.3077 0.223 0.4693
odds: 3.25 4.48 2.13
over/under1.5: 1.10 10.99
over/under2.5: 1.34 3.90
over/under3.5: 1.91 2.09
1.7206229646000002 1.4672184198
prob: 0.4531 0.2094 0.3375
odds: 2.21 4.78 2.96
over/under1.5: 1.06 17.15
over/under2.5: 1.23 5.29
over/under3.5: 1.62 2.61
1.183185 1.5739128573000003
prob: 0.3005 0.2207 0.4788
odds: 3.33 4.53 2.09
over/under1.5: 1.10 10.94
over/under2.5: 1.33 4.01
over/under3.5: 1.92 2.09
1.2461762548 2.0178611074
prob: 0.2563 0.2005 0.5432
odds: 3.90 4.99 1.84
over/under1.5: 1.06 16.56
over/under2.5: 1.22 5.48
over/under3.5: 1.59 2.68*/