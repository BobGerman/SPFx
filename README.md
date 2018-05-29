# SPFx
### Bob German's SharePoint Framework Samples

This repo contains SharePoint Framework samples used in my talks at various conferences since July 2016. I update solutions from time to time, which is good unless you were looking for the version from two years ago!

I'm in the process of copying this stuff over to the official [SharePoint Dev Samples repo](https://github.com/SharePoint/sp-dev-samples) but will keep copies here for now since I've given out a lot of links to the projects. The links below point to the current version, regardless of which repo that's in.

Thanks!

Bob German (@Bob1German)

## Slides

The [Slides](./Slides/) folder contains slide decks from recent workshops I've led on SPFx. Each deck ends with helpful reference links.

_SP-S01 Office 365 Development Overview_ - Introduction to Office 365 development all-up, including Office add-ins, SharePoint development, Teams development, and more

_SP-S02 - What is Modern SharePoint_ - Modern SharePoint is the #1 reason for adopting the SharePoint Framework. This presentation explains how Microsoft is modernizing SharePoint even as it serves millions of users around the world.

_SP-T01 - SharePoint Framework Tools and work flow_ - Introduction to the tools used to build for SPFx; starting from scratch

_SP-T02 - Introduction to TypeScript_ - Getting started with TypeScript (accompanying source code is [here](http://bit.ly/LearnTypeScript))

_SP-T03 - Bundling and Webpack_ - Bundling concepts; importing and exporting modules
(accompanying source code is [here](https://github.com/BobGerman/SPFx/tree/master/WebPackDemoKO))

_SP-T04 - React Basics - Learn enough React to get started and to build small projects like web parts and extensions
(accompanying source code is [here](https://bit.ly/ReactQuotes)) and [here](https://github.com/BobGerman/SPFx/tree/master/quotes)

_SP-T05 - Accessing SharePoint and Graph APIs_ - This section needs an update to the new MSGraphClient and AadHttpClient
(accompanying source code is [here](https://github.com/BobGerman/SPFx/tree/master/Fetch))

## Samples

[_Fetch_](./Fetch) - Shows how to access SharePoint and Graph API's from the SharePoint Framework. Needs update for the new MSGraph API.

[_Link Picker_](./linkPicker) - Shows how to access the OneDrive file picker when editing a web part. Related blog article is [here](https://blogs.msdn.microsoft.com/bobgerman/2017/07/16/using-the-onedrive-file-picker-in-sharepoint-framework-solutions/).

[_Quotes_](./quotes) - Displays one or more quotes from a SharePoint list; shows several concepts including a React web part with Office UI Fabric components, a custom editor component, and more. A simpler version in Plunker is available for you to play with [here](https://bit.ly/ReactQuotes).

[_Weather_](./weather) - The web part that everybody has to write! This one is old and may not work; I need to overhaul. It's in ReactJS.

[_WebPackDemoKO_](./WebPackDemoKO) - Simple Knockout web part shows several examples of how imports and exports work. Look in /src/webparts/webPackKo/modules for some simple files that show the various syntaxes.