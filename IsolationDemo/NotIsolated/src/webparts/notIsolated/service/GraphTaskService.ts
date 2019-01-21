// import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { ServiceScope } from '@microsoft/sp-core-library';

// import { ITask } from '../model/ITask';
// import { ITaskService } from '../service/ITaskService';

// import { MSGraphClient } from '@microsoft/sp-http';
// import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

// export class GraphTaskService implements ITaskService {

//     public getInfo(context: WebPartContext, serviceScope: ServiceScope) {
//         return new Promise<ITask[] | string> ((resolve, reject) => {

//             context.msGraphClientFactory
//                 .getClient()
//                 .then((client) => {
//                     client
//                     .api("me/people")
//                     .version("v1.0")
//                     .get((error, response) => {
                        
//                         if (error) {
    
//                             reject(error.message);
    
//                         } else {
    
//                             // Transform the array of Persons to an array of
//                             // strings to be displayed
//                             const value: MicrosoftGraph.Person[] = response.value;
//                             const result: string[] = value.slice(0,9).map((v) => {
//                                 if (v.givenName || v.surname) {
//                                     return v.givenName + " " + v.surname;
//                                 } else if (v.scoredEmailAddresses && v.scoredEmailAddresses[0]
//                                            && v.scoredEmailAddresses[0].address) {
//                                     return v.scoredEmailAddresses[0].address;
//                                 } else {
//                                     return `User ID ${v.id}`;
//                                 }
//                             });
//                             resolve({
//                                 "title": "Graph /me/people from MSGraphClient",
//                                 "items": result
//                             });
    
//                         }
//                     });                
    
//                 });
//         });
//     }

// }