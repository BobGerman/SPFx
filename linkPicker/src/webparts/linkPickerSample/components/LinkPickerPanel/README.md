# LinkPickerPanel component

Usage:

    <LinkPickerPanel

        // CSS class (currently not used)
        className = <string>

        // Absolute URL for SPWeb
        webAbsUrl = <string>

        // True to open the link picker
        isOpen = <boolean>

        // Type of link to pick (see below)
        linkType = <LinkType>

        // Called when panel is closed
        // a null url indicates the panel was closed
        //    without selecting a link
        onClose = <(url?:string) => void>
    />

The link type is used to filter the files shown in the document browser, and to add
validation checking for data URL's in the link entry form. The link entry form does not enforce link type; for example a user can enter the URL of an .aspx file even if pages aren't part of the link type.

 * doc - select a document
 * page - select a page
 * image - select an image
 * folder - select a folder
 * any - select any

LinkType is a bitwise enumeration, so you can use the OR operator to allow selecting more link types. For example:

    LinkType.folder | LinkType.doc | LinkType.image

will select documents, pages, and images. The any type is the logical OR of the other values.

The parent component needs to maintain the open/closed state of the LinkPickerPanel.
This is the same pattern used by Office UI Fabric panels and dialogs, and is in keeping with the [principle of "lifting state up"](https://facebook.github.io/react/docs/lifting-state-up.html).

1. Initially set your open/closed state to closed

        constructor(){
            super();
            this.state = {
                isLinkPanelOpen : false
            };
        }


2. Render the LinkPickerPanel with isOpen= based on your open/closed state

        public render(): React.ReactElement<IBoxButtonWebPartProps> {
            return (
                <LinkPickerPanel
                    className={styles["link-picker"]}
                    webAbsUrl={this.props.context.pageContext.web.absoluteUrl}
                    isOpen={this.state.isLinkPanelOpen}
                    linkType={LinkType.any}
                    onDismiss={this.dismissLinkPicker.bind(this)} />
                }
            );
        }

3. To open the link picker, set your own state to open, and render will pass it in the isOpen prop.

        private openLinkPicker(event){
            this.setState({
            isLinkPanelOpen: true
            });
        }


4. When onClose is called, it's your job to set your state to closed.

        private onLinkPickerClosed(url) {
            if (url) {
                // User picked a link
                // Do something with it!
            }
            this.setState({
                isLinkPanelOpen: false
            });
        }


onClose() returns a url if one was picked, or null if the panel was closed without selecting a link.
