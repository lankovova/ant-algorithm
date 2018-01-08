import {tasks} from './tasksArray';

class Tasks {
	static getTask(name) {
		return tasks[name];
	}
}

export default Tasks;
