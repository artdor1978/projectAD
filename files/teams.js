const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const url = "https://www.infogol.net/en/teams/australian-a-league/44";
	await page.goto(url);

	await page.waitForSelector(".league-table-content-long");
	const teams = await page.$$eval(".league-table-content-long", (nodes) =>
		nodes.map((n) => n.innerText)
	);
	const jsonData = JSON.stringify(teams, null, "\t");
	let fileName = "port" + ".js";
	fs.writeFileSync(fileName, jsonData);
	await browser.close();
})();