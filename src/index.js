import Tasks from './Tasks';
import AntAlgo from './AntAlgo';
import Edge from './Edge';
import { outputMapWeight, getMinInArray } from './Helper';

const taskName = 'ftv64';

const taskRawString = Tasks.getTask(taskName);
const taskRaw = taskRawString.trim().split('\n');

let task = [];
for (let i = 0; i < taskRaw.length; i++) {
	task.push(taskRaw[i].split(' ').map(item => new Edge(parseInt(item), 1)));
}

const AMOUNT_OF_PROGONOK = 20;

document.querySelector('#startBtn').onclick = function() {
	let allProgonkiPerfomace = [];
	document.querySelector('#root').innerText = `Loading`;

	setTimeout(() => {
		let algoResults = [];

		// Progonki
		for (let i = 0; i < AMOUNT_OF_PROGONOK; i++) {
			const t0 = performance.now();

			const algo = new AntAlgo(task);
			const algoRes = algo.run();

			const t1 = performance.now();

			allProgonkiPerfomace.push(t1 - t0);

			algoResults.push(algoRes);
		}

		document.querySelector('#root').innerText = `Done`;

		// Get best progonka result
		let min = Number.MAX_SAFE_INTEGER;
		let minIndex;
		for (let i = 0; i < algoResults.length; i++) {
			if (algoResults[i].length < min) {
				min = algoResults[i].length;
				minIndex = i;
			}
		}

		const averageTime = allProgonkiPerfomace.reduce((sum, current) => sum + current) / AMOUNT_OF_PROGONOK;
		console.log(`Best result in ${AMOUNT_OF_PROGONOK} progonok for ${taskName} problem, avarage time = ${averageTime / 1000}`);
		console.log(algoResults[minIndex]);
	}, 0);
};

