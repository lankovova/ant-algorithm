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
}

export default AntColony;
