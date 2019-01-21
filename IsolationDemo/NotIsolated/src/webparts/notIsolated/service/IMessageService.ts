export interface IMessage {
    title: string;
}

export interface IMailService {
    get(): Promise<IMessage[] | string>;
}