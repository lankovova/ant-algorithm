import Tasks from './Tasks';
import AntAlgo from './AntAlgo';
import Edge from './Edge';
import { outputMapWeight, getMinInArray } from './Helper';

const taskRawString = Tasks.getTask(3);
const taskRaw = taskRawString.split('\n');

let task = [];
for (let i = 0; i < taskRaw.length; i++) {
	task.push(taskRaw[i].split(' ').map(item => new Edge(parseInt(item), 1)));
}

const AMOUNT_OF_PROGONOK = 20;

document.querySelector('#startBtn').onclick = function() {
	document.querySelector('#root').innerText = `Loading`;

	setTimeout(() => {
		let algoResults = [];

		// Progonki
		for (let i = 0; i < AMOUNT_OF_PROGONOK; i++) {
			const algo = new AntAlgo(task);
			const algoRes = algo.run();
			algoResults.push(algoRes);

			document.querySelector('#root').innerText = `Done`;
		}

		let min = Number.MAX_SAFE_INTEGER;
		let minIndex;
		for (let i = 0; i < algoResults.length; i++) {
			if (algoResults[i].length < min) {
				min = algoResults[i].length;
				minIndex = i;
			}
		}

		console.log(`Best result in ${AMOUNT_OF_PROGONOK} progonok`);
		console.log(algoResults[minIndex]);
	}, 0);
};

