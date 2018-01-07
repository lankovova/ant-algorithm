import Ant from './Ant';
import { outputMapPheromone } from './Helper';

// Интенсивность испарения феромона
const P = 0.5;

class AntColony {
	constructor(map) {
		this.colony = [];

		this.map = map;

		this.routes = [];
	}

	create(amount) {
		for (let i = 0; i < amount; i++) {
			const startLocation = Math.floor(Math.random() * this.map.length);

			this.colony.push(new Ant(this.map, startLocation));
		}
	}

	findFood() {
		for (let i = 0; i < this.colony.length; i++) {
			const antRoute = this.colony[i].walk();

			this.routes.push(antRoute);
		}

		this.pheromoneSteam();
	}

	pheromoneSteam() {
		for (let i = 0; i < this.map.length; i++) {
			for (let j = 0; j < this.map[i].length; j++) {
				this.map[i][j].pheromone *= 1 - P;
			}
		}
	}

	get allRoutes() {
		return this.routes;
	}

	getBestRoute() {
		const uniqRoutes = this.getUniqRoutes();
		let routesRepeats = [];

		for (let i = 0; i < uniqRoutes.length; i++) {
			let repeatCounter = 0;
			for (let j = 0; j < this.routes.length; j++) {
				if (JSON.stringify(uniqRoutes[i]) === JSON.stringify(this.routes[j])) {
					repeatCounter++;
				}
			}
			routesRepeats.push(repeatCounter);
		}

		let max = {
			value: 0,
			index: 0
		};
		for (let i = 0; i < routesRepeats.length; i++) {
			if (routesRepeats[i] > max.value) {
				max.value = routesRepeats[i];
				max.index = i;
			}
		}

		return {
			route: uniqRoutes[max.index],
			repeats: max.value
		};
	}

	getUniqRoutes() {
		let uniqRoutes = [];

		for (let i = 0; i < this.routes.length; i++) {
			if (uniqRoutes.length === 0) {
				uniqRoutes.push(this.routes[i]);
				continue;
			}

			let foundUniq = true;
			for (let j = 0; j < uniqRoutes.length; j++) {
				if (JSON.stringify(this.routes[i]) === JSON.stringify(uniqRoutes[j])) {
					foundUniq = false;
				}
			}
			if (foundUniq)
				uniqRoutes.push(this.routes[i]);
		}

		return uniqRoutes;
	}
}

export default AntColony;
