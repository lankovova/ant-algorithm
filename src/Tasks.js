import tasksArray from './tasksArray';

class Tasks {
	static getTask(number) {
		return tasksArray[number - 1];
	}
}

export default Tasks;
