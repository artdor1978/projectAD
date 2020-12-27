const { dutchTeams, urlsIdDutch } = require("./dutchE.js");
const lStat = (place) => {
	let leagueStat = [];
	dutchTeams.forEach((x) => {
		const homeData = require("../data/" + x.infogol + ".json");
		const indexTeam = dutchTeams.indexOf(x);
		leagueStat.push({
			team: x.infogol,
			xg: +homeData
				.filter(
					(team) =>
						(team.EventTeamID === urlsIdDutch[indexTeam]) &
						(team[place] === urlsIdDutch[indexTeam])
				)
				.reduce((sum, shot) => sum + shot.Prob, 0),
			shoots: homeData.filter(
				(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team[place] === urlsIdDutch[indexTeam])
			).length,
			high: homeData.filter(
				(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team.Prob > 0.15) &
					(team[place] === urlsIdDutch[indexTeam])
			).length,
			played: [
				...new Set(
					homeData
						.filter(
							(team) =>
								(team.EventTeamID === urlsIdDutch[indexTeam]) &
								(team[place] === urlsIdDutch[indexTeam])
						)
						.map((prob) => prob.MatchID)
				),
			].length,
		});
	});
	console.log(leagueStat);
	const sumOfxG = leagueStat.reduce((sum, x) => sum + x.xg, 0);
	const sumOfshoots = leagueStat.reduce((sum, x) => sum + x.shoots, 0);
	const sumOfgames = leagueStat.reduce((sum, x) => sum + x.played, 0);
	console.log(
		sumOfxG / sumOfgames / (sumOfshoots / sumOfgames),
		sumOfshoots / sumOfgames
	);
};
lStat("HomeTeamID");
lStat("AwayTeamID");
