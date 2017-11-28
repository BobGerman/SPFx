export interface ISpListResponse {
    value: Value[];
}

export interface Value {
    AllowContentTypes: boolean;
    BaseTemplate: number;
    BaseType: number;
    ContentTypesEnabled: boolean;
    CrawlNonDefaultViews: boolean;
    Created: Date;
    DefaultContentApprovalWorkflowId: string;
    DefaultItemOpenUseListSetting: boolean;
    Description: string;
    Direction: string;
    DocumentTemplateUrl: string;
    DraftVersionVisibility: number;
    EnableAttachments: boolean;
    EnableFolderCreation: boolean;
    EnableMinorVersions: boolean;
    EnableModeration: boolean;
    EnableVersioning: boolean;
    EntityTypeName: string;
    ExemptFromBlockDownloadOfNonViewableFiles: boolean;
    FileSavePostProcessingEnabled: boolean;
    ForceCheckout: boolean;
    HasExternalDataSource: boolean;
    Hidden: boolean;
    Id: string;
    ImagePath: ImagePath;
    ImageUrl: string;
    IrmEnabled: boolean;
    IrmExpire: boolean;
    IrmReject: boolean;
    IsApplicationList: boolean;
    IsCatalog: boolean;
    IsPrivate: boolean;
    ItemCount: number;
    LastItemDeletedDate: Date;
    LastItemModifiedDate: Date;
    LastItemUserModifiedDate: Date;
    ListExperienceOptions: number;
    ListItemEntityTypeFullName: string;
    MajorVersionLimit: number;
    MajorWithMinorVersionsLimit: number;
    MultipleDataList: boolean;
    NoCrawl: boolean;
    ParentWebPath: ParentWebPath;
    ParentWebUrl: string;
    ParserDisabled: boolean;
    ServerTemplateCanCreateFolders: boolean;
    TemplateFeatureId: string;
    Title: string;
}

export interface ImagePath {
    DecodedUrl: string;
}

export interface ParentWebPath {
    DecodedUrl: string;
}


