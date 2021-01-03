const { teamStat } = require("./statAll.js");
const { poissonDist } = require("./poissonDistribution.js");
const { dutchTeams, urlsIdDutch } = require("./dutchE.js");
const odds = require("../output/" + "ODDS2021-01-03.json");
//nameTeam = "Ajax";

//
const statAddAll = (tArr) => {
	const indOne = dutchTeams.map((x) => x.today).indexOf(tArr.homeTeam);
	const indTwo = dutchTeams.map((x) => x.today).indexOf(tArr.awayTeam);
	const teamOne = teamStat(tArr.homeTeam, 100, "HomeTeamID");
	const teamTwo = teamStat(tArr.awayTeam, 100, "AwayTeamID");
	console.log(teamOne, teamTwo);
	if (teamOne) {
		/*const predictOne =
			((teamOne.xGSh + teamTwo.xGASh) / 2) * ((teamOne.Sh + teamTwo.ShA) / 2);
		const predictTwo =
			((teamOne.xGASh + teamTwo.xGSh) / 2) * ((teamOne.ShA + teamTwo.Sh) / 2);*/
		/*const predictOne =
			(teamOne.xGSh + teamTwo.xGASh - 0.116) *
			(teamOne.Sh + teamTwo.ShA - 12.65);
		const predictTwo =
			(teamOne.xGASh + teamTwo.xGSh - 0.116) *
			(teamOne.ShA + teamTwo.Sh - 11.21);*/
		const predictOne =
			((teamOne.xGSh * teamTwo.xGASh) / 0.116) *
			((teamOne.Sh * teamTwo.ShA) / 12.65);
		const predictTwo =
			((teamOne.xGASh * teamTwo.xGSh) / 0.116) *
			((teamOne.ShA * teamTwo.Sh) / 11.21);
		const goals = [...Array(11).keys()];
		const probOne = goals.map((g) => poissonDist(g, predictOne));
		const probTwo = goals.map((g) => poissonDist(g, predictTwo));
		//probOne.unshift(0);
		//probTwo.unshift(0);
		console.log(predictOne.toFixed(2), predictTwo.toFixed(2));
		const closest = (counts, goal) =>
			counts.reduce(function (prev, curr) {
				return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
			});
		/*const closest = (haystack, needle) => {
		return haystack.reduce((a, b) => {
			let aDiff = Math.abs(a - needle);
			let bDiff = Math.abs(b - needle);

			if (aDiff == bDiff) {
				return a > b ? a : b;
			} else {
				return bDiff < aDiff ? b : a;
			}
		});
	};*/
		const monteXG = (prob) => {
			let data = [];
			for (let index = 0; index < 10000; index++) {
				data.push(prob.indexOf(closest(prob, Math.random())));
			}
			return data;
		};
		const monteHome = monteXG(probOne);
		const monteAway = monteXG(probTwo);
		let win = 0,
			draw = 0,
			lose = 0,
			over2 = 0,
			under2 = 0,
			over1 = 0,
			under1 = 0,
			over3 = 0,
			under3 = 0;
		for (let index = 0; index < monteHome.length; index++) {
			monteHome[index] > monteAway[index]
				? win++
				: monteHome[index] === monteAway[index]
				? draw++
				: lose++;
			/*monteHome[index] + monteAway[index] > 2.5 ? over2++ : under2++;
		monteHome[index] + monteAway[index] > 1.5 ? over1++ : under1++;
		monteHome[index] + monteAway[index] > 3.5 ? over3++ : under3++;*/
		}
		//console.log(monteHome,monteAway);
		//console.log(predictOne, predictTwo);
		console.log("prob:", win / 10000, draw / 10000, lose / 10000);
		console.log(
			"odds:",
			(1 / (win / 10000)).toFixed(2),
			(1 / (draw / 10000)).toFixed(2),
			(1 / (lose / 10000)).toFixed(2)
		);
		console.log(
			"value: ",
			(
				odds
					.filter(
						(odd) =>
							(odd.homeTeam === dutchTeams[indOne].oddsportal) &
							(odd.awayTeam === dutchTeams[indTwo].oddsportal)
					)
					.map((v) => +v.win) *
					(win / 10000) -
				1
			).toFixed(2),
			(
				odds
					.filter(
						(odd) =>
							(odd.homeTeam === dutchTeams[indOne].oddsportal) &
							(odd.awayTeam === dutchTeams[indTwo].oddsportal)
					)
					.map((v) => +v.draw) *
					(draw / 10000) -
				1
			).toFixed(2),
			(
				odds
					.filter(
						(odd) =>
							(odd.homeTeam === dutchTeams[indOne].oddsportal) &
							(odd.awayTeam === dutchTeams[indTwo].oddsportal)
					)
					.map((v) => +v.lose) *
					(lose / 10000) -
				1
			).toFixed(2)
		);
		/*console.log(
		"over/under1.5:",
		(1 / (over1 / 10000)).toFixed(2),
		(1 / (under1 / 10000)).toFixed(2)
	);
	console.log(
		"over/under2.5:",
		(1 / (over2 / 10000)).toFixed(2),
		(1 / (under2 / 10000)).toFixed(2)
	);
	console.log(
		"over/under3.5:",
		(1 / (over3 / 10000)).toFixed(2),
		(1 / (under3 / 10000)).toFixed(2)
	);
	const ccc = Math.random();
	console.log(probOne, ccc, probOne.indexOf(closest(probOne, ccc)));
	const countOccurrences = (arr) =>
		arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
	console.log(countOccurrences(monteHome));
	console.log(countOccurrences(monteAway));*/
	} else {
		console.log(tArr);
	}
};

//console.log(probOne, probTwo);
module.exports = {
	statAddAll,
};
