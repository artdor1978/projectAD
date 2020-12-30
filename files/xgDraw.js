const teamData = require("../data/" + "Gil Vicente" + ".json");
const gameId = [...new Set(teamData.map((prob) => prob.MatchID))];
let hzero = 0,
		azero = 0;
for (let game = 0; game < gameId.length; game++) {
	
	const gameData = teamData.filter((x) => x.MatchID === gameId[game]);
	for (
		let index = 0;
		index < gameData.map((v) => v.EventTypeID).indexOf(16);
		index++
	) {
		if (
			(gameData[index].EventTeamID === gameData[index].HomeTeamID) &
			(gameData[index].AwayTeamID === 1646)
		) {
			hzero += gameData[index].Prob;
		}
		if (
			(gameData[index].EventTeamID === gameData[index].AwayTeamID) &
			(gameData[index].AwayTeamID === 1646)
		) {
			azero += gameData[index].Prob;
		}
	}
	//console.log(hzero, azero, hzero / azero);
}
console.log(hzero, azero, hzero / azero);
