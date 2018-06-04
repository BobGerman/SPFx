export interface ScoredEmailAddress {
    address: string;
    relevanceScore: number;
    selectionLikelihood: string;
}

export interface Phone {
    type: string;
    number: string;
}

export interface PersonType {
    class: string;
    subclass: string;
}

export interface IGraphPerson {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    birthday: string;
    personNotes: string;
    isFavorite: boolean;
    jobTitle?: any;
    companyName?: any;
    yomiCompany: string;
    department?: any;
    officeLocation?: any;
    profession: string;
    userPrincipalName: string;
    imAddress: string;
    scoredEmailAddresses: ScoredEmailAddress[];
    phones: Phone[];
    postalAddresses: any[];
    websites: any[];
    personType: PersonType;
}

export interface IGraphPeopleResponse {
    value: IGraphPerson[];
}
