const teamData = require("../data/" + "Verona" + ".json");
const gameId = "82396";
let hdraw = 0,
	adraw = 0,
	hwin = 0,
	awin = 0,
	hlose = 0,
	alose = 0;
let goalsFor = 0,
	goalsAgainst = 0;
const gameData = teamData.filter((x) => x.MatchID === gameId);
gameData.forEach((x) => {
	console.log(x.EventTeamID, x.EventTypeID, x.Prob);
	if ((x.EventTypeID === 16) & (goalsFor === goalsAgainst)) {
		if (x.EventTeamID === x.HomeTeamID) {
			hdraw += x.Prob;
			goalsFor += 1;
		} else {
			adraw += x.Prob;
			goalsAgainst += 1;
		}
	} else if ((x.EventTypeID === 16) & (goalsFor > goalsAgainst)) {
		if (x.EventTeamID === x.HomeTeamID) {
			hwin += x.Prob;
			goalsFor += 1;
		} else {
			awin += x.Prob;
			goalsAgainst += 1;
		}
	} else if ((x.EventTypeID === 16) & (goalsFor < goalsAgainst)) {
		if (x.EventTeamID === x.HomeTeamID) {
			hlose += x.Prob;
			goalsFor += 1;
		} else {
			alose += x.Prob;
			goalsAgainst += 1;
		}
	} else if ((x.EventTypeID !== 16) & (goalsFor === goalsAgainst)) {
		if (x.EventTeamID === x.HomeTeamID) {
			hdraw += x.Prob;
		} else {
			adraw += x.Prob;
		}
	} else if ((x.EventTypeID !== 16) & (goalsFor > goalsAgainst)) {
		if (x.EventTeamID === x.HomeTeamID) {
			hwin += x.Prob;
		} else {
			awin += x.Prob;
		}
	} else if ((x.EventTypeID !== 16) & (goalsFor < goalsAgainst)) {
		if (x.EventTeamID === x.HomeTeamID) {
			hlose += x.Prob;
		} else {
			alose += x.Prob;
		}
	}
	console.log(goalsFor, goalsAgainst, hwin, awin, hdraw, adraw, hlose, alose);
});
