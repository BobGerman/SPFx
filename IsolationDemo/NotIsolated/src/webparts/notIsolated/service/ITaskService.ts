import { ITask } from '../model/ITask';

export interface ITaskService {
    get(): Promise<ITask[] | string>;
}