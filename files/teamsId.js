const teamsData = (teams, ids) => {
	let teamsIds = [];
	for (let index = 0; index < teams.length; index++) {
		teamsIds.push({
			Name: teams[index],
			ID: ids[index],
		});
	}
	return teamsIds;
};
export { teamsData };
