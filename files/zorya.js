var http = require("http");
const fetch = require("node-fetch");
const url =
	"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2282346%22%5D";

//"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2272843%22%5D";
//	"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2270283%22%5D";
//"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2284156%22%5D";
//"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2284134%22%5D";
//"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2284189%22%5D";
//	"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2284325%22%5D";
//	"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2282308%22%5D";
//"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2284275%22%5D";
//"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%2284274%22%5D";
fetch(url, {
	method: "GET",
	headers: { "Content-type": "application/json;charset=UTF-8" },
})
	.then((response) => response.json())
	.then((json) => getStat(json))
	.catch((err) => console.log(err));

const getStat = (json) => {
	//console.log(json);
	console.table([
		//Goals
		{
			home: json.filter(
				(team) =>
					(team.EventTeamID === team.HomeTeamID) &
					(team.EventTypeID === 16)
			).length,
			away: json.filter(
				(team) =>
					(team.EventTeamID === team.AwayTeamID) &
					(team.EventTypeID === 16)
			).length,
		},
		//xG
		{
			home: +json
				.filter((team) => team.EventTeamID === team.HomeTeamID)
				.reduce((sum, shot) => sum + shot.Prob, 0)
				.toFixed(2),
			away: +json
				.filter((team) => team.EventTeamID === team.AwayTeamID)
				.reduce((sum, shot) => sum + shot.Prob, 0)
				.toFixed(2),
		},
		//Shoots
		{
			home: json.filter((team) => team.EventTeamID === team.HomeTeamID)
				.length,
			away: json.filter((team) => team.EventTeamID === team.AwayTeamID)
				.length,
		},
		//High Prob
		{
			home: json.filter(
				(team) =>
					(team.EventTeamID === team.HomeTeamID) & (team.Prob > 0.15)
			).length,
			away: json.filter(
				(team) =>
					(team.EventTeamID === team.AwayTeamID) & (team.Prob > 0.15)
			).length,
		},
		//xG/Shoots
		{
			home: (
				+json
					.filter((team) => team.EventTeamID === team.HomeTeamID)
					.reduce((sum, shot) => sum + shot.Prob, 0) /
				json.filter((team) => team.EventTeamID === team.HomeTeamID).length
			).toFixed(2),
			away: (
				+json
					.filter((team) => team.EventTeamID === team.AwayTeamID)
					.reduce((sum, shot) => sum + shot.Prob, 0) /
				json.filter((team) => team.EventTeamID === team.AwayTeamID).length
			).toFixed(2),
		},
	]);
	//xGF
	console.log(
		json
			.filter((team) => team.EventTeamID === team.HomeTeamID)
			.map((prob) => prob.Prob.toFixed(2))
	);
	//xGA
	console.log(
		json
			.filter((team) => team.EventTeamID === team.AwayTeamID)
			.map((prob) => prob.Prob.toFixed(2))
	);
	//monteCarlo
	const monteXG = (teamValue) => {
		const xGF = json
			.filter((team) => team.EventTeamID === teamValue)
			.map((prob) => prob.Prob);
		let data = [];
		for (let index = 0; index < 10000; index++) {
			data.push(
				xGF
					.map((x) => (Math.random() <= x ? 1 : 0))
					.reduce((sum, shot) => sum + shot, 0)
			);
		}
		return data;
	};
	const monteHome = monteXG(json[0].HomeTeamID);
	const monteAway = monteXG(json[0].AwayTeamID);
	let win = 0,
		draw = 0,
		lose = 0,
		over = 0,
		under = 0;
	for (let index = 0; index < monteHome.length; index++) {
		monteHome[index] > monteAway[index]
			? win++
			: monteHome[index] === monteAway[index]
			? draw++
			: lose++;
		monteHome[index] + monteAway[index] > 2.5 ? over++ : under++;
	}
	console.log("prob:", win / 10000, draw / 10000, lose / 10000);
	console.log("over/under:", over / 10000, under / 10000);
};
//https://www.youtube.com/watch?v=ixbM-sYrKaE&list=PLDrmKwRSNx7I3oNz_9RncOmuOj1Bny-Yw
