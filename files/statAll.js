const teamStat = (nameTeam, exclude, place) => {
	const { dutchTeams, urlsIdDutch } = require("./dutchE.js");
	//nameTeam = "Ajax";
	const indexTeam = dutchTeams.map((x) => x.today).indexOf(nameTeam);
	console.log("\x1b[35m%s\x1b[0m", nameTeam);
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
				let index = 0;
				index <= gameData.map((v) => v.EventTypeID).indexOf(16);
				index++
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

		/*console.log(
			"xG0-0:",
			/*place === "HomeTeamID"
				? (hzero / azero).toFixed(2) +
						" " +*/
			//hzero.toFixed(1) + "/" + azero.toFixed(1)
			/*: (azero / hzero).toFixed(2) +
						" " +
						azero.toFixed(1) +
						"/" +
						hzero.toFixed(1)*/
		//);*/

		const teamOneXg = +homeData
			.filter(
				(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude]) &
					(team[place] === urlsIdDutch[indexTeam]) &
					(team.Penalty !== 1) &
					(team.OwnGoal !== 1)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		const teamTwoXg = +homeData
			.filter(
				(team) =>
					(team.EventTeamID !== urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude]) &
					(team[place] === urlsIdDutch[indexTeam]) &
					(team.Penalty !== 1) &
					(team.OwnGoal !== 1)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0)
			.toFixed(2);
		const teamOneGoals = +homeData.filter(
			(team) =>
				(team.EventTeamID === urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1) &
				(team.EventTypeID === 16)
		).length;
		const teamTwoGoals = +homeData.filter(
			(team) =>
				(team.EventTeamID !== urlsIdDutch[indexTeam]) &
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam]) &
				(team.EventTypeID === 16) &
				(team.Penalty !== 1) &
				(team.OwnGoal !== 1)
		).length;
		//xG/Shoots
		const teamOneXgShoots = +(
			+homeData
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
		const teamTwoXgShoots = +(
			+homeData
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
		const probGoalsHome = +(
			+homeData
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
		const probGoalsAway = +(
			+homeData
				.filter(
					(team) =>
						(team.EventTeamID !== urlsIdDutch[indexTeam]) &
						(team.MatchID !== gameId[exclude]) &
						(team[place] === urlsIdDutch[indexTeam]) &
						(team.Penalty !== 1) &
						(team.OwnGoal !== 1) &
						(team.EventTypeID === 16)
				)
				.reduce((sum, shot) => sum + shot.Prob, 0) /
			+homeData.filter(
				(team) =>
					(team.EventTeamID !== urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude]) &
					(team[place] === urlsIdDutch[indexTeam]) &
					(team.Penalty !== 1) &
					(team.OwnGoal !== 1) &
					(team.EventTypeID === 16)
			).length
		).toFixed(2);
		const last15h = +homeData
			.filter(
				(team) =>
					(team.EventTeamID === urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude]) &
					(team[place] === urlsIdDutch[indexTeam]) &
					(team.Penalty !== 1) &
					(team.OwnGoal !== 1) &
					(team.EventMinute > 75)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0);
		const last15a = +homeData
			.filter(
				(team) =>
					(team.EventTeamID !== urlsIdDutch[indexTeam]) &
					(team.MatchID !== gameId[exclude]) &
					(team[place] === urlsIdDutch[indexTeam]) &
					(team.Penalty !== 1) &
					(team.OwnGoal !== 1) &
					(team.EventMinute > 75)
			)
			.reduce((sum, shot) => sum + shot.Prob, 0);
		const teamObj = {
			xGSh: teamOneXgShoots,
			Sh: teamOneShoots,
			high: highOne.toFixed(2),
			xGASh: teamTwoXgShoots,
			ShA: teamTwoShoots,
			highA: highTwo.toFixed(2),
			/*goalsFor: probGoalsHome,
			goalsAgainst: probGoalsAway,*/
			last15: last15h.toFixed(1) + "/" + last15a.toFixed(1),
			luck: (teamOneGoals - teamTwoGoals - teamOneXg + teamTwoXg).toFixed(2),
			t1xg: +(teamOneXg / teamOneGoals).toFixed(2),
			t2xg: +(teamTwoXg / teamTwoGoals).toFixed(2),
			hzero: +hzero.toFixed(1),
			azero: +azero.toFixed(1),
		};
		return teamObj;
	} else {
		console.log(nameTeam);
	}
};
module.exports = {
	teamStat,
};
