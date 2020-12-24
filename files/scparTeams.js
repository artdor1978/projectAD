const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const url = "https://www.infogol.net/en/matches/today";
	/*await page.goto(url);

	await page.waitForSelector(".league-table-content-long");
	const teams = await page.$$eval(".league-table-content-long", (nodes) =>
		nodes.map((n) => n.innerText)
	);*/
	await page.goto(url);

	await page.waitForSelector(".match-text");
	const teams = await page.$$eval(".match-text", (nodes) =>
		nodes.map((n) => n.innerText)
	);
	console.log(teams);
	const jsonData = JSON.stringify(teams, null, "\t");
			let fileName = new Date().toISOString().slice(0, 10)+".json";
			fs.writeFileSync(fileName, jsonData);
	await browser.close();
})();