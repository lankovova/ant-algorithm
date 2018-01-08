import { getRandomIndexInChanceSegments } from './Helper';

const ALPHA = 1;
const BETA = 1.3;
const Q = 1;

class Ant {
	constructor(map, placeOfBirth) {
		this.visitiedPlaces = [];

		this.map = map;
		this.position = placeOfBirth;

		this.route = [];

		// Add start point to route
		this.route.push(this.position);
		// Ban start point
		this.banPlace(this.position);
	}

	hasWaysToGo() {
		for (let i = 0; i < this.map[this.position].length; i++) {
			if (this.visitiedPlaces.indexOf(i) === -1) {
				// && this.map[this.position][i].weight !== 0
				if (i !== this.position)
					return true;
			}
		}

		return false;
	}

	getAvailableNeighborhoods() {
		let neighborhoods = [];

		for (let i = 0; i < this.map[this.position].length; i++) {
			// Skip already visited places
			if (this.visitiedPlaces.indexOf(i) !== -1) continue;

			// TEMP: Check later if slef place is added to list of visited places
			// Get rid of self place and edges with 0 weight
			// && this.map[this.position][i].weight !== 0
			if (i !== this.position)
				neighborhoods.push(i);
		}

		return neighborhoods;
	}

	getBestPlaceToGo(placesToGo) {
		let edgesChances = [];
		// For each available edge
		for (let i = 0; i < placesToGo.length; i++) {
			// Edge attraction = (edge feromone)^alpha * (1/edge weight)^beta
			const currentEdge = this.map[this.position][placesToGo[i]];
			// TODO: If edge weight is 0 than go to it or choose random edge between more that one zero's
			const wayValue = Math.pow(currentEdge.pheromone, ALPHA) * Math.pow(1 / currentEdge.weight, BETA);

			edgesChances.push(wayValue);
		}

		// Get sum of all edges values
		let sumOfEdgesChances = edgesChances.reduce((sum, currentValue) => sum + currentValue)
		sumOfEdgesChances = +sumOfEdgesChances.toFixed(12);

		let bestPlaceIndex;

		// If there is edge with 0 weight
		if (sumOfEdgesChances === Infinity) {
			let surelyPlacesToGoIndexes = [];
			for (let i = 0; i < edgesChances.length; i++) {
				if (edgesChances[i] === Infinity)
					surelyPlacesToGoIndexes.push(i);
			}

			const randomPlaceIndex = Math.floor(Math.random() * surelyPlacesToGoIndexes.length);
			bestPlaceIndex = surelyPlacesToGoIndexes[randomPlaceIndex];
		} else {
			// Count attractions of all edges
			let goToChances = [];
			for (let i = 0; i < placesToGo.length; i++) {
				// 100 * This way value / Sum of all ways value
				const goToChance = 100 * edgesChances[i] / sumOfEdgesChances;

				goToChances.push(goToChance);
			}

			bestPlaceIndex = getRandomIndexInChanceSegments(goToChances);
		}
		return placesToGo[bestPlaceIndex];
	}

	makeStep() {
		// Get available neighborhoods to go
		const neighborhoods = this.getAvailableNeighborhoods();

		// Get best place to go based on route attraction
		const bestPlaceToGo = this.getBestPlaceToGo(neighborhoods);

		// Making actual step
		this.position = bestPlaceToGo;

		// Add new place to route
		this.route.push(this.position);

		// Ban current point to go to in future
		this.banPlace(this.position);
	}

	walk() {
		while (this.hasWaysToGo()) {
			this.makeStep();
		}

		// Walk backwards and place feromone
		for (let i = 1; i < this.route.length; i++) {
			this.addPheromoneOnEdge(this.route[i - 1], this.route[i]);
		}

		return this.route;
	}

	addPheromoneOnEdge(placeFrom, placeTo) {
		this.map[placeFrom][placeTo].pheromone += Q / this.getRouteWeight(this.route);
		this.map[placeTo][placeFrom].pheromone += Q / this.getRouteWeight(this.route);
	}

	getRouteWeight(route) {
		let routeLength = 0;

		for (let i = 1; i < route.length; i++) {
			routeLength += this.map[i - 1][i].weight;
		}

		return routeLength;
	}

	banPlace(placeNumber) {
		this.visitiedPlaces.push(placeNumber);
	}
}

export default Ant;
