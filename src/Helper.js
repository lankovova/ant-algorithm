const getRandomIndexInChanceSegments = chanceSegments => {
	const randomNumber = Math.random() * 100;

	let chancesSum = 0;
	for (let i = 0; i < chanceSegments.length; i++) {
		chancesSum += chanceSegments[i];

		// If random number in range
		if (randomNumber < chancesSum) {
			return i;
		}
	}

	return 0;
}

const outputMapProp = prop => {
	return map => {
		let stringMapView = '';
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				stringMapView += `${map[i][j][prop].toFixed(3)} `;
			}
			stringMapView += '\n';
		}
		console.log(stringMapView);
	}
}
const outputMapPheromone = outputMapProp('pheromone');
const outputMapWeight = outputMapProp('weight');

const getMinInArray = array => {
	return Math.min(...array);
}

export { getRandomIndexInChanceSegments, outputMapPheromone, outputMapWeight, getMinInArray };
