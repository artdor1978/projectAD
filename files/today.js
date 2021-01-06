const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	const url = "https://www.infogol.net/en/matches/today";
	await page.goto(url);
	await page.waitForSelector(".match-text");
	const teams = await page.$$eval(".match-text", (nodes) =>
		nodes.map((n) => n.innerText)
	);

	let today = [];
	for (let index = 0; index < teams.length; index += 4) {
		today.push({
			homeTeam: teams[index],
			awayTeam: teams[index + 2],
			time: teams[index + 3],
		});
	}
	//console.log(today);
	const jsonData = JSON.stringify(
		today.filter((x) => x.time != "FT"& x.time != "P"),
		null,
		"\t"
	);
	let fileName =
		"../output/" + new Date().toISOString().slice(0, 10) + ".json";
	fs.writeFileSync(fileName, jsonData);
	await browser.close();
})();
