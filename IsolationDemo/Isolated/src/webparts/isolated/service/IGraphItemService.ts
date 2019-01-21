export interface IGraphItem {
    title: string;
}

export interface IGraphItemService {
    get(): Promise<IGraphItem[] | string>;
}