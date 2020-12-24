const { statAdd } = require("./statAdd.js");
const tour = [
	["Juventus", "Atalanta"],
	["Fiorentina", "Sassuolo"],
	["Genoa", "AC Milan"],
	["Inter Milan", "Napoli"],
	["Parma", "Cagliari"],
	["Spezia", "Bologna"],
	["Verona", "Sampdoria"],
];
tour.forEach((x) => statAdd(x));
/*1.5699449999999997 1.3972480000000003
prob: 0.4155 0.2193 0.3652
odds: 2.41 4.56 2.74
over/under1.5: 1.08 13.30
over/under2.5: 1.29 4.49
over/under3.5: 1.76 2.32
1.460574248525 1.57222096185
prob: 0.3724 0.2191 0.4085
odds: 2.69 4.56 2.45
over/under1.5: 1.08 13.66
over/under2.5: 1.28 4.63
over/under3.5: 1.71 2.41
1.1026900724250002 2.10157671345
prob: 0.2119 0.1947 0.5934
odds: 4.72 5.14 1.69
over/under1.5: 1.07 15.92
over/under2.5: 1.24 5.08
over/under3.5: 1.63 2.60
1.5687687848 1.6365866972499998
prob: 0.3833 0.2069 0.4098
odds: 2.61 4.83 2.44
over/under1.5: 1.07 15.46
over/under2.5: 1.23 5.29
over/under3.5: 1.61 2.63
1.5350586898499998 1.4796155061
prob: 0.4082 0.2185 0.3733
odds: 2.45 4.58 2.68
over/under1.5: 1.08 13.12
over/under2.5: 1.28 4.56
over/under3.5: 1.75 2.34
1.3902206107500001 1.676875
prob: 0.3367 0.2113 0.452
odds: 2.97 4.73 2.21
over/under1.5: 1.08 13.76
over/under2.5: 1.27 4.73
over/under3.5: 1.68 2.46
1.5206697924 1.45515778815
prob: 0.409 0.2183 0.3727
odds: 2.44 4.58 2.68
over/under1.5: 1.08 13.44
over/under2.5: 1.28 4.58
over/under3.5: 1.76 2.32*/