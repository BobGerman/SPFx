import { IMailService, IMessage } from './IMessageService';


export default class MockMailService implements IMailService {

    private mockItems: IMessage[] =
    [
        { title: "Mock message 1" },
        { title: "Mock message 2" },
        { title: "Mock message 3" }
    ];

    public get(): Promise<IMessage[] | string> {
        return new Promise<IMessage[]>((resolve) => {
            resolve (this.mockItems);
        });
    }
}