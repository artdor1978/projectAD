const teamStat = (nameTeam, exclude, place) => {
	const {
		dutchTeams,
		urlsIdDutch
	} = require("./dutchE.js");
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
				.filter(
					(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team[place] === urlsIdDutch[indexTeam])
				)
				.map((prob) => prob.MatchID)
			),
		];

		let hzero = 0,
			azero = 0;
		for (let game = 0; game < gameId.length; game++) {
			const gameData = homeData.filter((x) => x.MatchID === gameId[game]);
			for (
				let index = 0; index < gameData.map((v) => v.EventTypeID).indexOf(16); index++
			) {
				if (gameData[index].EventTeamID === gameData[index].HomeTeamID) {
					hzero += gameData[index].Prob;
				}

				if (gameData[index].EventTeamID === gameData[index].AwayTeamID) {
					azero += gameData[index].Prob;
				}
			}
		}
		//console.log(hzero, azero, hzero / azero);

		console.log(
			"xG0-0:",
			place === "HomeTeamID" ?
			(hzero / azero).toFixed(2) :
			(azero / hzero).toFixed(2)
		);

		const teamOneXg = +homeData
			.filter(
				(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam])
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		const teamTwoXg = +homeData
			.filter(
				(team) =>
				(team.EventTeamID !== urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam])
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		const teamOneGoals = +homeData
			.filter(
				(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.EventTypeID === 16)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		const teamTwoGoals = +homeData
			.filter(
				(team) =>
				(team.EventTeamID !== urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.EventTypeID === 16)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		//xG/Shoots
		const teamOneXgShoots = +(+homeData
			.filter(
				(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0) /
			+homeData.filter(
				(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			).length
		).toFixed(5);
		const teamTwoXgShoots = +(+homeData
			.filter(
				(team) =>
				(team.EventTeamID !== urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0) /
			+homeData.filter(
				(team) =>
				(team.EventTeamID !== urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			).length
		).toFixed(5);
		//Shoots/Game
		const teamOneShoots = +(
			homeData
			.filter(
				(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			)
			.length.toFixed(2) /
			[
				...new Set(
					homeData
					.filter(
						(team) =>
						(team.EventTeamID === urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude]) &
						(team[place] === urlsIdDutch[indexTeam])
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
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			)
			.length.toFixed(2) /
			[
				...new Set(
					homeData
					.filter(
						(team) =>
						(team.EventTeamID === urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude]) &
						(team[place] === urlsIdDutch[indexTeam])
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
				(team.Prob > 0.15) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			).length /
			[
				...new Set(
					homeData
					.filter(
						(team) =>
						(team.EventTeamID === urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude]) &
						(team[place] === urlsIdDutch[indexTeam])
					)
					.map((prob) => prob.MatchID)
				),
			].length;
		const highTwo =
			homeData.filter(
				(team) =>
				(team.EventTeamID !== urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team.Prob > 0.15) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
			).length /
			[
				...new Set(
					homeData
					.filter(
						(team) =>
						(team.EventTeamID === urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude]) &
						(team[place] === urlsIdDutch[indexTeam])
					)
					.map((prob) => prob.MatchID)
				),
			].length;
		const probGoals = +(+homeData
			.filter(
				(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1) &
				(team.EventTypeID === 16)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0) /
			+homeData.filter(
				(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1) &
				(team.EventTypeID === 16)
			).length
		).toFixed(2);
		const last15h = +homeData.filter(
			(team) =>
			(team.EventTeamID === urlsIdDutch[indexTeam]) &
			(team.MatchID !== gameId[exclude]) &
			(team[place] === urlsIdDutch[indexTeam]) &
			(team.Penalty !== 1) &
			(team.OwnGoal !== 1) &
			(team.EventMinute > 75)
		).reduce((sum, shot) => sum + shot.Prob, 0);
		const last15a = +homeData.filter(
			(team) =>
			(team.EventTeamID !== urlsIdDutch[indexTeam]) &
			(team.MatchID !== gameId[exclude]) &
			(team[place] === urlsIdDutch[indexTeam]) &
			(team.Penalty !== 1) &
			(team.OwnGoal !== 1) &
			(team.EventMinute > 75)
		).reduce((sum, shot) => sum + shot.Prob, 0);
		const teamObj = {
			xGSh: teamOneXgShoots,
			Sh: teamOneShoots,
			high: highOne.toFixed(2),
			xGASh: teamTwoXgShoots,
			ShA: teamTwoShoots,
			highA: highTwo.toFixed(2),
			goals: probGoals,
			last15: (last15h / last15a).toFixed(2),
			luck: (teamOneGoals - teamTwoGoals - teamOneXg + teamTwoXg).toFixed(2)
		};
		return teamObj;
	} else {
		console.log(nameTeam);
	}
};
module.exports = {
	teamStat,
};