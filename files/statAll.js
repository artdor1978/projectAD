const teamStat = (nameTeam, exclude) => {
	const { dutchTeams, urlsIdDutch } = require("./dutchE.js");
	//nameTeam = "Ajax";
	const indexTeam = dutchTeams.map((x) => x.today).indexOf(nameTeam);
	console.log(nameTeam);
	if (indexTeam >= 0) {
		const homeData = require("../data/" +
			dutchTeams[indexTeam].infogol +
			".json");
		//console.log(nameTeam, indexTeam, sss);
		const gameId = [
			...new Set(
				homeData
					.filter((team) => team.EventTeamID === urlsIdDutch[indexTeam])
					.map((prob) => prob.MatchID)
			),
		];
		const teamOneXg = +homeData
			.filter(
				(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude])
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		const teamTwoXg = +homeData
			.filter(
				(team) =>
					(team.EventTeamID !== urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude])
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		//xG/Shoots
		const teamOneXgShoots = +(
			+homeData
				.filter(
					(team) =>
						(team.EventTeamID === urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude])
				)
				.reduce((sum, shot) => sum + shot.Prob, 0) /
			+homeData.filter(
				(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude])
			).length
		).toFixed(5);
		const teamTwoXgShoots = +(
			+homeData
				.filter(
					(team) =>
						(team.EventTeamID !== urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude])
				)
				.reduce((sum, shot) => sum + shot.Prob, 0) /
			+homeData.filter(
				(team) =>
					(team.EventTeamID !== urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude])
			).length
		).toFixed(5);
		//Shoots/Game
		const teamOneShoots = +(
			homeData
				.filter(
					(team) =>
						(team.EventTeamID === urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude])
				)
				.length.toFixed(2) /
			[
				...new Set(
					homeData
						.filter(
							(team) =>
								(team.EventTeamID === urlsIdDutch[indexTeam]) &
								(team.MatchID !== gameId[exclude])
						)
						.map((prob) => prob.MatchID)
				),
			].length
		).toFixed(5);
		const teamTwoShoots = +(
			homeData
				.filter(
					(team) =>
						(team.EventTeamID !== urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude])
				)
				.length.toFixed(2) /
			[
				...new Set(
					homeData
						.filter(
							(team) =>
								(team.EventTeamID === urlsIdDutch[indexTeam]) &
								(team.MatchID !== gameId[exclude])
						)
						.map((prob) => prob.MatchID)
				),
			].length
		).toFixed(5);
		const highOne =
			homeData.filter(
				(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude]) &
					(team.Prob > 0.15)
			).length /
			[
				...new Set(
					homeData
						.filter(
							(team) =>
								(team.EventTeamID === urlsIdDutch[indexTeam]) &
								(team.MatchID !== gameId[exclude])
						)
						.map((prob) => prob.MatchID)
				),
			].length;
		const highTwo =
			homeData.filter(
				(team) =>
					(team.EventTeamID !== urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude]) &
					(team.Prob > 0.15)
			).length /
			[
				...new Set(
					homeData
						.filter(
							(team) =>
								(team.EventTeamID === urlsIdDutch[indexTeam]) &
								(team.MatchID !== gameId[exclude])
						)
						.map((prob) => prob.MatchID)
				),
			].length;
		const teamObj = {
			xGSh: teamOneXgShoots,
			Sh: teamOneShoots,
			high: highOne.toFixed(2),
			xGASh: teamTwoXgShoots,
			ShA: teamTwoShoots,
			highA: highTwo.toFixed(2),
		};
		return teamObj;
	} else {
		console.log(nameTeam);
	}
};
module.exports = {
	teamStat,
};
