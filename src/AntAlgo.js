import AntColony from './AntColony';
import { outputMapPheromone, getMinInArray } from './Helper';

const COLONIES_AMOUNT = 300;

class AntAlgo {
	constructor(map) {
		this.map = map;
	}

	run() {
		let resultLengths = [];

		let bestResult = {};

		for (let i = 0; i < COLONIES_AMOUNT; i++) {
			const colony = new AntColony(this.map);
			const antsAmount = parseInt(this.map.length / 2);
			colony.create(antsAmount);
			colony.findFood();

			if (i === COLONIES_AMOUNT - 1) {
				const allRoutes = colony.allRoutes;

				// Get all routes lengths from colony result
				for (let k = 0; k < allRoutes.length; k++) {
					resultLengths.push(this.getRouteLength(allRoutes[k]));
				}

				// Find best route and store it length
				const minLength = getMinInArray(resultLengths);
				bestResult.route = allRoutes[resultLengths.indexOf(minLength)];
				bestResult.length = minLength;
			}
		}

		return bestResult;
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
