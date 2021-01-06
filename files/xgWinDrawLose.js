const gameProgress = (nameTeam, exclude, place) => {
	const { dutchTeams, urlsIdDutch } = require("./dutchE.js");
	const indexTeam = dutchTeams.map((x) => x.today).indexOf(nameTeam);
	if (indexTeam >= 0) {
		const teamData = require("../data/" +
			dutchTeams[indexTeam].infogol +
			".json");
		//const teamData = require("../data/" + "Verona" + ".json");
		const gameId = [
			...new Set(
				teamData
					.filter(
						(team) =>
							(team.EventTeamID === urlsIdDutch[indexTeam]) &
							(team[place] === urlsIdDutch[indexTeam])
					)
					.map((prob) => prob.MatchID)
			),
		];
		//const gameId = "82396";
		let hdraw = 0,
			adraw = 0,
			hwin = 0,
			awin = 0,
			hlose = 0,
			alose = 0;
		let goalsFor = 0,
			goalsAgainst = 0;
		const gameData = teamData.filter(
			(team) =>
				(team.MatchID !== gameId[exclude]) &
				(team[place] === urlsIdDutch[indexTeam])
		);

		gameData.forEach((x) => {
			//console.log(x.EventTeamID, x.EventTypeID, x.Prob);
			if (
				(x.EventTypeID === 16) &
				(goalsFor === goalsAgainst) &
				(x.Penalty !== 1) &
				(x.OwnGoal !== 1)
			) {
				if (x.EventTeamID === x.HomeTeamID) {
					hdraw += x.Prob;
					goalsFor += 1;
				} else {
					adraw += x.Prob;
					goalsAgainst += 1;
				}
			} else if (
				(x.EventTypeID === 16) &
				(goalsFor > goalsAgainst) &
				(x.Penalty !== 1) &
				(x.OwnGoal !== 1)
			) {
				if (x.EventTeamID === x.HomeTeamID) {
					hwin += x.Prob;
					goalsFor += 1;
				} else {
					awin += x.Prob;
					goalsAgainst += 1;
				}
			} else if (
				(x.EventTypeID === 16) &
				(goalsFor < goalsAgainst) &
				(x.Penalty !== 1) &
				(x.OwnGoal !== 1)
			) {
				if (x.EventTeamID === x.HomeTeamID) {
					hlose += x.Prob;
					goalsFor += 1;
				} else {
					alose += x.Prob;
					goalsAgainst += 1;
				}
			} else if (
				(x.EventTypeID !== 16) &
				(goalsFor === goalsAgainst) &
				(x.Penalty !== 1) &
				(x.OwnGoal !== 1)
			) {
				if (x.EventTeamID === x.HomeTeamID) {
					hdraw += x.Prob;
				} else {
					adraw += x.Prob;
				}
			} else if (
				(x.EventTypeID !== 16) &
				(goalsFor > goalsAgainst) &
				(x.Penalty !== 1) &
				(x.OwnGoal !== 1)
			) {
				if (x.EventTeamID === x.HomeTeamID) {
					hwin += x.Prob;
				} else {
					awin += x.Prob;
				}
			} else if (
				(x.EventTypeID !== 16) &
				(goalsFor < goalsAgainst) &
				(x.Penalty !== 1) &
				(x.OwnGoal !== 1)
			) {
				if (x.EventTeamID === x.HomeTeamID) {
					hlose += x.Prob;
				} else {
					alose += x.Prob;
				}
			}
		});

		/*console.log(
			nameTeam,
			goalsFor,
			goalsAgainst,
			(hwin / awin).toFixed(2),
			(hdraw / adraw).toFixed(2),
			(hlose / alose).toFixed(2)
		);*/
		/*console.log(
			nameTeam,
			goalsFor,
			goalsAgainst,
			hwin.toFixed(1) + "/" + awin.toFixed(1) + "; ",
			hdraw.toFixed(1) + "/" + adraw.toFixed(1) + "; ",
			hlose.toFixed(1) + "/" + alose.toFixed(1)
		);*/
		const gameProObj = {
			GF: goalsFor,
			GA: goalsAgainst,
			HW: +hwin.toFixed(1),
			AW: +awin.toFixed(1),
			HD: +hdraw.toFixed(1),
			AD: +adraw.toFixed(1),
			HL: +hlose.toFixed(1),
			AL: +alose.toFixed(1),
		};
		return gameProObj;
	}
};
module.exports = {
	gameProgress,
};
