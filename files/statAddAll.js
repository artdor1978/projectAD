const { teamStat } = require("./statAll.js");
const { gameProgress } = require("./xgWinDrawLose.js");
const { poissonDist } = require("./poissonDistribution.js");
const { dutchTeams, urlsIdDutch } = require("./dutchE.js");
const odds = require("../output/" + "ODDS2021-01-11.json");
//nameTeam = "Ajax";

//
const statAddAll = (tArr) => {
	const indOne = dutchTeams.map((x) => x.today).indexOf(tArr.homeTeam);
	const indTwo = dutchTeams.map((x) => x.today).indexOf(tArr.awayTeam);
	const teamOne = teamStat(tArr.homeTeam, 150, "HomeTeamID");
	const teamTwo = teamStat(tArr.awayTeam, 150, "AwayTeamID");
	const gamePrOne = gameProgress(tArr.homeTeam, 150, "HomeTeamID");
	const gamePrTwo = gameProgress(tArr.awayTeam, 150, "AwayTeamID");

	if (teamOne) {
		//console.log("last15:", teamOne.last15, teamTwo.last15);
		/*console.log(
			"0-0:",
			(teamOne.hzero + teamTwo.hzero).toFixed(1) + "/" + (teamOne.azero + teamTwo.azero).toFixed(1), "     ",
			((teamOne.hzero + teamTwo.hzero) / (teamOne.azero + teamTwo.azero)).toFixed(1), "     ",
			(teamOne.hzero / teamOne.azero).toFixed(1),
			(teamTwo.azero / teamTwo.hzero).toFixed(1)
		);*/
		console.log(
			"WIN:",
			/*(gamePrOne.HW + gamePrTwo.HW).toFixed(1) + "/" + (gamePrOne.AW + gamePrTwo.AW).toFixed(1), "     ",
			((gamePrOne.HW + gamePrTwo.HW) / (gamePrOne.AW + gamePrTwo.AW)).toFixed(1), "     ",*/
			(gamePrOne.HW / gamePrOne.AW).toFixed(1),
			(gamePrTwo.AW / gamePrTwo.HW).toFixed(1),
			gamePrOne.HW,
			gamePrOne.AW,
			gamePrTwo.AW,
			gamePrTwo.HW
		);
		console.log(
			"\x1b[31m%s\x1b[31m%s\x1b[31m%s\x1b[31m%s\x1b[0m",
			"DRAW: ",
			/*(gamePrOne.HD + gamePrTwo.HD).toFixed(1) + "/" + (gamePrOne.AD + gamePrTwo.AD).toFixed(1), "     ",
			((gamePrOne.HD + gamePrTwo.HD) / (gamePrOne.AD + gamePrTwo.AD)).toFixed(1), "     ",*/
			(gamePrOne.HD / gamePrOne.AD).toFixed(1), " ",
			(gamePrTwo.AD / gamePrTwo.HD).toFixed(1),
			gamePrOne.HD,
			gamePrOne.AD,
			gamePrTwo.AD,
			gamePrTwo.HD
		);
		console.log(
			"LOSE:",
			/*(gamePrOne.HL + gamePrTwo.HL).toFixed(1) + "/" + (gamePrOne.AL + gamePrTwo.AL).toFixed(1), "     ",
			((gamePrOne.HL + gamePrTwo.HL) / (gamePrOne.AL + gamePrTwo.AL)).toFixed(1), "     ",*/
			(gamePrOne.HL / gamePrOne.AL).toFixed(1),
			(gamePrTwo.AL / gamePrTwo.HL).toFixed(1),
			gamePrOne.HL,
			gamePrOne.AL,
			gamePrTwo.AL,
			gamePrTwo.HL
		);
		console.log("luck:", teamOne.luck, teamTwo.luck);
	}
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
		const forecastOne = predictOne * teamOne.t1xg * teamTwo.t2xg;
		const forecastTwo = predictTwo * teamOne.t2xg * teamTwo.t1xg;
		console.log(
			"\x1b[31m%s\x1b[34m%s\x1b[34m%s\x1b[34m%s\x1b[31m%s\x1b[31m%s\x1b[0m",
			"predict: ",
			predictOne.toFixed(2),
			" ",
			predictTwo.toFixed(2),
			" ",
			(predictOne + predictTwo).toFixed(1)
		);
		//console.log("forecast:", forecastOne.toFixed(2), forecastTwo.toFixed(2));
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
		//console.log("prob:", win / 10000, draw / 10000, lose / 10000);
		/*console.log(
			"odds:",
			(1 / (win / 10000)).toFixed(2),
			(1 / (draw / 10000)).toFixed(2),
			(1 / (lose / 10000)).toFixed(2)
		);*/
		console.log(
			"\x1b[33m%s\x1b[0m",
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
