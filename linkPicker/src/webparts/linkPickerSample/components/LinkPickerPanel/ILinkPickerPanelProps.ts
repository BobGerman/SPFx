// Bitwise enumeration of link type(s) to select
export enum LinkType {
    doc    = 1 << 0,
    page   = 1 << 1,
    image  = 1 << 2,
    folder = 1 << 3,
    any    = doc | page | image | folder
}

export interface ILinkPickerPanelProps {
    className: string;
    webAbsUrl: string;
    isOpen: boolean;
    linkType: LinkType;
    onClose: (string) => void;
}