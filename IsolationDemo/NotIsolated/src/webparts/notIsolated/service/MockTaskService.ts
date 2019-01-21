import { ITaskService } from './ITaskService';
import { ITask } from '../model/ITask';

import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class MockMyInfoService implements ITaskService {

    private mockItems: ITask[] =
    [
        { title: "Mock task 1" },
        { title: "Mock task 2" },
        { title: "Mock task 3" }
    ];

    constructor(context: IWebPartContext) { }

    public get(): Promise<ITask[] | string> {
        return new Promise<ITask[]>((resolve) => {
            resolve (this.mockItems);
        });
    }
}