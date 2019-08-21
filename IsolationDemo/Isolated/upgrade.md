# Upgrade project C:\Source\Repos\SPFx\IsolationDemo\Isolated to v1.8.2

Date: 2019-8-21

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.8.2. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.8.2
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.8.2
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.8.2
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.8.2
```

File: [./package.json](./package.json)

### FN001005 @types/react | Required

Upgrade SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm i -SE @types/react@16.7.22
```

File: [./package.json](./package.json)

### FN001006 @types/react-dom | Required

Upgrade SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm i -SE @types/react-dom@16.8.0
```

File: [./package.json](./package.json)

### FN001022 office-ui-fabric-react | Required

Install SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@6.143.0
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.8.2
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.8.2
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i -DE @microsoft/sp-webpart-workbench@1.8.2
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.8.2
```

File: [./package.json](./package.json)

### FN002011 @microsoft/rush-stack-compiler-2.9 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-2.9

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-2.9@0.7.7
```

File: [./package.json](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.8.2"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.9/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN020001 @types/react | Required

Add resolution for package @types/react

In file [./package.json](./package.json) update the code as follows:

```json
{
  "resolutions": {
    "@types/react": "16.7.22"
  }
}
```

File: [./package.json](./package.json)

### FN001008 react | Required

Upgrade SharePoint Framework dependency package react

Execute the following command:

```sh
npm i -SE react@16.7.0
```

File: [./package.json](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i -SE react-dom@16.7.0
```

File: [./package.json](./package.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

In file [src\webparts\isolated\IsolatedWebPart.manifest.json](src\webparts\isolated\IsolatedWebPart.manifest.json) update the code as follows:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\isolated\IsolatedWebPart.manifest.json](src\webparts\isolated\IsolatedWebPart.manifest.json)

### FN012014 tsconfig.json compiler options inlineSources | Required

Update tsconfig.json inlineSources value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012015 tsconfig.json compiler options strictNullChecks | Required

Update tsconfig.json strictNullChecks value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012016 tsconfig.json compiler options noUnusedLocals | Required

Update tsconfig.json noUnusedLocals value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

In file [src\webparts\isolated\IsolatedWebPart.ts](src\webparts\isolated\IsolatedWebPart.ts) update the code as follows:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src\webparts\isolated\IsolatedWebPart.ts:4:1](src\webparts\isolated\IsolatedWebPart.ts)

### FN014006 sourceMapPathOverrides in .vscode/launch.json | Recommended

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*"

In file [.vscode\launch.json](.vscode\launch.json) update the code as follows:

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

File: [.vscode\launch.json](.vscode\launch.json)

### FN014006 sourceMapPathOverrides in .vscode/launch.json | Recommended

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*"

In file [.vscode\launch.json](.vscode\launch.json) update the code as follows:

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

File: [.vscode\launch.json](.vscode\launch.json)

### FN017001 Run npm dedupe | Optional

If, after upgrading npm packages, when building the project you have errors similar to: "error TS2345: Argument of type 'SPHttpClientConfiguration' is not assignable to parameter of type 'SPHttpClientConfiguration'", try running 'npm dedupe' to cleanup npm packages.

Execute the following command:

```sh
npm dedupe
```

File: [./package.json](./package.json)

## Summary

### Execute script

```sh
npm i -SE @microsoft/sp-core-library@1.8.2 @microsoft/sp-lodash-subset@1.8.2 @microsoft/sp-office-ui-fabric-core@1.8.2 @microsoft/sp-webpart-base@1.8.2 @types/react@16.7.22 @types/react-dom@16.8.0 office-ui-fabric-react@6.143.0 react@16.7.0 react-dom@16.7.0
npm i -DE @microsoft/sp-build-web@1.8.2 @microsoft/sp-module-interfaces@1.8.2 @microsoft/sp-webpart-workbench@1.8.2 @microsoft/sp-tslint-rules@1.8.2 @microsoft/rush-stack-compiler-2.9@0.7.7
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.8.2"
  }
}
```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.9/includes/tsconfig-web.json"
}
```

Update tsconfig.json inlineSources value:

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

Update tsconfig.json strictNullChecks value:

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

Update tsconfig.json noUnusedLocals value:

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

#### [./package.json](./package.json)

Add resolution for package @types/react:

```json
{
  "resolutions": {
    "@types/react": "16.7.22"
  }
}
```

#### [src\webparts\isolated\IsolatedWebPart.manifest.json](src\webparts\isolated\IsolatedWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

#### [src\webparts\isolated\IsolatedWebPart.ts](src\webparts\isolated\IsolatedWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

#### [.vscode\launch.json](.vscode\launch.json)

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*":

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*":

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```
