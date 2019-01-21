import { IGraphItemService, IGraphItem } from './IGraphItemService';


export default class MockGraphItemService implements IGraphItemService {

    private mockItems: IGraphItem[] =
    [
        { title: "Mock item 1" },
        { title: "Mock item 2" },
        { title: "Mock item 3" }
    ];

    public get(): Promise<IGraphItem[] | string> {
        return new Promise<IGraphItem[]>((resolve) => {
            resolve (this.mockItems);
        });
    }
}