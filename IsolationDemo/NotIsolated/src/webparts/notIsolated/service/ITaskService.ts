export interface ITask {
    title: string;
}

export interface ITaskService {
    get(): Promise<ITask[] | string>;
}