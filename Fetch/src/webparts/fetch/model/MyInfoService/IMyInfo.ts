export interface IMyInfo {
    myName: string;             // Fetch with Microsoft Graph
    spListNames: string[];      // Fetch with SpHttpClient
    postings: string[];         // Fetch w/Fetch - http://services.odata.org/Northwind/Northwind.svc/Customers/
}