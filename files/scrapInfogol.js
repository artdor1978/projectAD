const { dutchTeams, urlsIdDutch } = require("./dutchE.js"); //"type":"module",
const puppeteer = require("puppeteer");
const fs = require("fs");
const http = require("http");
const fetch = require("node-fetch");

(async () => {
	const startTime = new Date();
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	const modteamsNames = dutchTeams.map((team) =>
		team.infogol.toLowerCase().replace(/\s/g, "-")
	);
	for (let indT = 0; indT < dutchTeams.length; indT++) {
		const url =
			"https://www.infogol.net/en/team/" +
			modteamsNames[indT] +
			"/" +
			urlsIdDutch[indT];
		console.log(url);
		await page.goto(url);
		await page.waitForSelector(".player-list-name");
		const [button] = await page.$x("//button[contains(., 'Results')]");
		if (button) {
			await button.click();
		}
		await page.waitForSelector(".tss-matches-date");

		/*const matchInfo = await page.$$eval(".match-has-link", (nodes) =>
			nodes.map((n) => n.innerText.split("\t"))
		);*/
		const matchID = await page.$$eval(".tss-matches-go-to-match", (nodes) =>
			nodes.map((n) =>
				n.childNodes[0].href.substr(n.childNodes[0].href.length - 5)
			)
		);
		//console.log(matchID);
		try {
			const content = [];
			for (let index = 0; index < matchID.length; index++) {
				const urlMatch =
					"https://www.infogolapp.com/DataRequest/Query/vw_ShotEvents?filterJson=%5B%22MatchID%22,%22eq%22,%22" +
					matchID[index] +
					"%22%5D";
				//console.log(urlMatch);
				const res = await fetch(urlMatch);
				const resJson = await res.json();
				content.push(resJson);
			}

			let flattened = content.reduce(
				(accumulator, currentValue) => accumulator.concat(currentValue),
				[]
			);
			const jsonData = JSON.stringify(flattened, null, "\t");
			//console.log(dutchTeams[0].infogol);
			let fileName = "../data/" + dutchTeams[indT].infogol + ".json";
			//console.log(fileName);
			fs.writeFileSync(fileName, jsonData);
			//matchID.forEach((id) => {
			console.log(
				flattened
					.filter(
						(team) => team.EventTeamID === urlsIdDutch[indT]
						//& 								(team.MatchID === id)
					)
					.reduce((sum, shot) => sum + shot.Prob, 0)
					.toFixed(2)
			);
			console.log(
				flattened
					.filter(
						(team) => team.EventTeamID !== urlsIdDutch[indT]
						//&								(team.MatchID === id)
					)
					.reduce((sum, shot) => sum + shot.Prob, 0)
					.toFixed(2)
			);
			//});
		} catch (e) {
			console.log("error!!!!!!!!!!!!!!!");
		}
	}
	console.log("done");
	const endTime = new Date();
	console.log((endTime - startTime) / 1000, "sec");
	await browser.close();
})();
