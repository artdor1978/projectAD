const puppeteer = require("puppeteer");
const fs = require("fs");
const urls = [
	"https://www.oddsportal.com/soccer/england/premier-league",
	"https://www.oddsportal.com/soccer/england/championship",
	"https://www.oddsportal.com/soccer/spain/laliga",
	"https://www.oddsportal.com/soccer/italy/serie-a",
	"https://www.oddsportal.com/soccer/germany/bundesliga",
	"https://www.oddsportal.com/soccer/france/ligue-1",
	"https://www.oddsportal.com/soccer/portugal/primeira-liga",
	"https://www.oddsportal.com/soccer/netherlands/eredivisie",
];
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	let data = [];
	for (var element of urls) {
		const url = element;
		await page.goto(url);
		await page.waitForSelector(".name");
		const teams = await page.$$eval(".name", (nodes) =>
			nodes.map((n) => n.innerText.split("-"))
		);
		const home = teams.map((x) => x[0].trim().replace(/\^W/, ""));
		const away = teams.map((x) => x[1].trim().replace(/\^W/, ""));
		const odds = await page.$$eval(".odds-nowrp", (nodes) =>
			nodes.map((n) => n.innerText)
		);
		//console.log(odds);
		
		let y = 0;
		for (let index = 0; index < home.length; index++) {
			data.push({
				homeTeam: home[index],
				awayTeam: away[index],
				win: odds[y],
				draw: odds[y + 1],
				lose: odds[y + 2],
			});
			y += 3;
		}

		console.log(data);
		
	}
	const jsonData = JSON.stringify(data, null, "\t");
	let fileName =
		"../output/" + "ODDS" + new Date().toISOString().slice(0, 10) + ".json";
	fs.writeFileSync(fileName, jsonData);
	await browser.close();
})();
