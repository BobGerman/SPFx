import { ITaskService, ITask } from './ITaskService';


export default class MockMyInfoService implements ITaskService {

    private mockItems: ITask[] =
    [
        { title: "Mock task 1" },
        { title: "Mock task 2" },
        { title: "Mock task 3" }
    ];

    public get(): Promise<ITask[] | string> {
        return new Promise<ITask[]>((resolve) => {
            resolve (this.mockItems);
        });
    }
}