import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { ILinkPickerPanelProps, LinkType } from './ILinkPickerPanelProps';
import { ILinkPickerPanelState, NavState } from './ILinkPickerPanelState';

import styles from './LinkPickerPanel.module.scss';
import { strings } from '../loc/en-us';

export default class LinkPickerPanel extends React.Component<ILinkPickerPanelProps, ILinkPickerPanelState> {

  constructor(
      // public className: string,
  ) {
      super();
      this.state = {
        isOpen: false,
        navState: NavState.site,
        isUrlValid: false,
        url: ""
      };
  }

  public render(): JSX.Element {

    // Figure out which UI to show based on the navigation state
    const showDocPickerIFrame =
      this.state.navState == NavState.site;
    const showLinkEntryForm =
      this.state.navState == NavState.link;
    
    return (

      <Panel isOpen={this.state.isOpen}
              onDismissed={this.removeMessageListener.bind(this)}
              className={styles["link-picker"]}
              hasCloseButton={false}
              type={ PanelType.extraLarge }
              isLightDismiss={true}
              onDismiss={this.onCancelButtonClick.bind(this)}>

          {/* Navigation on left of panel */}
          <Nav initialSelectedKey="site" isOnTop={true}
                groups={[{
                links:[
                  {
                    name: strings.LinkPickerSiteNav, 
                    icon:"Globe", key:"site", url:"#", 
                    onClick:this.onSiteNavClick.bind(this),
                    isExpanded: showDocPickerIFrame
                  },
                  {
                    name: strings.LinkPickerLinkNav,
                    icon:"Link", key:"link", url:"#",
                    onClick:this.onLinkNavClick.bind(this),
                    isExpanded: showLinkEntryForm
                  }
                ]
                }]}/>

          {/* Doc picker iFrame or link entry form */}
          <div className={styles["tabs"]}>

              <div hidden={!showDocPickerIFrame}>
                <iframe src={this.getDocPickerUrl()} role="application" title={strings.LinkPickerSelectFromSiteTitle}/>
              </div>

              <div hidden={!showLinkEntryForm} className={styles["link-insert"]}>
                <h2>{strings.LinkPickerSelectFromLinkLabel}</h2>
                <label htmlFor="linkUrl">{strings.LinkPickerSelectFromLinkDescription}</label><br/>
                <textarea id="linkUrl" aria-label={strings.LinkPickerSelectFromLinkDescription} onChange={this.onLinkTextChange.bind(this)} defaultValue={this.state.url}/>
                <div className={styles["buttons"]}>
                  <PrimaryButton disabled={!this.state.isUrlValid} onClick={this.onOkButtonClick.bind(this)}>{strings.LinkPickerSelectButtonText}</PrimaryButton>
                  <DefaultButton onClick={this.onCancelButtonClick.bind(this)}>{strings.LinkPickerCancelButtonText}</DefaultButton>
                </div>
              </div>

          </div>
      </Panel>
      );
  }
  
  private openLinkPanel() {
      this.addMessageListener();
      this.setState({
          isOpen: true, 
          navState: NavState.site,
          isUrlValid: false,
          url: ""  
      });
  }

  private closeLinkPanel() {
      this.removeMessageListener();
      this.setState({
        isOpen: false,
      });
  }

  // ** Method to open panel and pick a link **

  private resolvePickLink: (value?: string | Thenable<string>) => void;
  private rejectPickLink: (value?: string | Thenable<string>) => void;
  public pickLink (): Promise<string> {
      this.openLinkPanel();
      return new Promise<string>(
          (resolve, reject) => {
              this.resolvePickLink = resolve;
              this.rejectPickLink = reject;
      });
  }

  // ** Functions to manage the document selection iFrame **

  private addMessageListener(){
    addEventListener('message',this.onMessageReceived.bind(this), false);
  }

  private removeMessageListener (){
    removeEventListener('message',this.onMessageReceived.bind(this),false);
  }

  private onMessageReceived(event){
    if (event.data.indexOf('[OneDrive-FromPicker]',0)===0) {
      const json = JSON.parse(event.data.replace('[OneDrive-FromPicker]',''));
      const eventType = json.type;

      switch (eventType) {
        case 'success':
          const url = json.items[0].sharePoint.url;
          this.resolvePickLink(url);
          this.closeLinkPanel();
          break;
        case 'cancel':
          this.rejectPickLink();
          this.closeLinkPanel();
          break;
      }
    }
  }

  private getDocPickerUrl(){
    const anchor = document.createElement('a');
    anchor.href = this.props.webAbsUrl;

    let typeFilter = '&view=2&p=2&typeFilters=';
    if (this.props.linkType & LinkType.folder) typeFilter += 'folder,';
    if (this.props.linkType & LinkType.doc)    typeFilter += '.doc,.docx,.xls,.xlsx,.pot,.potx,.ppt,.pptx,.vsdx,.vsdm,.vsd,';
    if (this.props.linkType & LinkType.image)  typeFilter += '.gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,';
    if (this.props.linkType & LinkType.page)   typeFilter += '.aspx,';
    typeFilter = typeFilter.slice (0,-1);   // Trim trailing comma
    typeFilter += '&picker={"sn":false,"v":"files","id":"1","o":"';

    return anchor.href +
            "/_layouts/15/onedrive.aspx?id=" +
            anchor.pathname +
            typeFilter +
            anchor.hostname +
            '","s":"single"}';
  }

  // ** UI Event Handlers **
  
  // <Nav> event handlers
  private onSiteNavClick(event) {
    this.onNavClick(NavState.site);
  }

  private onLinkNavClick(event) {
    this.onNavClick(NavState.link);
  }

  private onNavClick(navState: NavState) {

     event.stopPropagation();
     event.preventDefault();
     
     this.setState(
      {
        navState: navState,
        isUrlValid:false,
        url: ""          
      }
    );
    return false;
  }

  // Link entry form
  private onLinkTextChange(event){
    this.setState ({
      url: event.target.value,
      isUrlValid: this.isValidLink(event.target.value)
    });
  }

  private onOkButtonClick(event){
    this.resolvePickLink(this.state.url);
    this.closeLinkPanel();
  }
  
  private onCancelButtonClick(){
    this.rejectPickLink();
    this.closeLinkPanel();
  }

  // ** Validation  **
  private isValidLink(url: string) {
        const httpUrlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        const dataUrlRegex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i;

        return httpUrlRegex.test(url) ||
               ((this.props.linkType | LinkType.image) && dataUrlRegex.test(url));
  }
}
