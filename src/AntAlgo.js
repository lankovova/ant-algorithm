import AntColony from './AntColony';
import { outputMapPheromone, getMinInArray } from './Helper';

const COLONIES_AMOUNT = 200;

class AntAlgo {
	constructor(map) {
		this.map = map;
	}

	run() {
		let allColoniesResults = [];

		for (let i = 0; i < COLONIES_AMOUNT; i++) {
			let resultLengths = [];

			const colony = new AntColony(this.map);
			const antsAmount = parseInt(this.map.length / 2);
			colony.create(antsAmount);
			colony.findFood();

			const allRoutes = colony.allRoutes;

			// Get all routes lengths from colony result
			for (let k = 0; k < allRoutes.length; k++) {
				resultLengths.push(this.getRouteLength(allRoutes[k]));
			}

			// Find best route and store it length
			const minLength = getMinInArray(resultLengths);
			const bestResultFromColony = {
				route: allRoutes[resultLengths.indexOf(minLength)],
				length: minLength
			};

			allColoniesResults.push(bestResultFromColony);
		}

		// Find best among all results
		const bestResult = this.findBestColoniesSolution(allColoniesResults);

		return bestResult;
	}

	findBestColoniesSolution(allColoniesResults) {
		let min = Number.MAX_SAFE_INTEGER;
		let minIndex;

		for (let i = 0; i < allColoniesResults.length; i++) {
			if (allColoniesResults[i].length < min) {
				min = allColoniesResults[i].length;
				minIndex = i;
			}
		}

		return allColoniesResults[minIndex];
	}

	getRouteLength(route) {
		let routeLength = 0;

		for (let i = 1; i < route.length; i++) {
			routeLength += this.map[route[i - 1]][route[i]].weight;
		}

		// Route weight from last point to start point
		routeLength += this.map[route[route.length - 1]][route[0]].weight;

		return routeLength;
	}
}

export default AntAlgo;
