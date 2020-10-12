import { ITask } from "./task.interface";


export class TaskRunner {
    constructor() {}

    public registerTask(name: string, func: Function, interval: number): ITask {
        let task: ITask = {
            name: name, 
            func: func,
            interval: interval
        }

        task.id = setInterval(func, interval);

        return task;
    }

    public unregisterTask(task: ITask): void {
        clearInterval(task.id);
    }

    public unregisterTaskById(id: number): void {
        clearInterval(id);
    }
}