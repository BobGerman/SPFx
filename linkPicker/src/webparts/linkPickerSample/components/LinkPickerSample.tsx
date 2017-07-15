import * as React from 'react';
import styles from './LinkPickerSample.module.scss';
import { ILinkPickerSampleProps } from './ILinkPickerSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

enum LinkType { doc, image, other }

export default class LinkPickerSample extends React.Component<ILinkPickerSampleProps, void> {


  public render(): React.ReactElement<ILinkPickerSampleProps> {

    var linkDisplay: React.ReactElement<HTMLAnchorElement>;

    switch (this.getLinkType(this.props.url)) {

      // Link is a document
      case LinkType.doc:
        let previewUrl = this.props.webAbsUrl +
          "/_layouts/15/getpreview.ashx?resolution=0&clientMode=modernWebPart&path=" +
          this.props.url + 
          "&width=252&height=200"
        linkDisplay = <a href={this.props.url + "?web=1"}
                         target="_blank"><img src={previewUrl} /></a>;
        break;

      // Link is an image
      case LinkType.image:
        linkDisplay = <a href={this.props.url} target="_blank">
                        <img src={this.props.url} />
                      </a>;
        break;
      
      // Link is something else
      default:
        linkDisplay = <a href={this.props.url} target="_blank">{this.props.url}</a>;
        break;
    }

    return (
      <div className={styles.linkPickerSample}>
        <div className={styles.container}>
          {linkDisplay}
        </div>
      </div>
    );
  }

  private getLinkType(url: string): LinkType {

    var result = LinkType.other;

    const docExtensions = ["pdf", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "pptm", "dot"];
    for(var i in docExtensions){
      if(url.indexOf(docExtensions[i], url.length - docExtensions[i].length) !== -1) {
        result = LinkType.doc;
      }
    }

    const imageExtensions = [".gif",".jpg",".jpeg",".bmp",".dib",".tif","tiff",".ico",".png",".jxr"];
    for(var i in imageExtensions){
      if(url.indexOf(imageExtensions[i], url.length - imageExtensions[i].length) !== -1) {
        result = LinkType.image;
      }
    }

    return result;
  }
}
