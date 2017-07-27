import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { 
  EnvironmentType
} from '@microsoft/sp-core-library';
import PropertyFieldLinkPickerHost, { IPropertyFieldLinkPickerHostProps } from './PropertyFieldListPickerHost';

export interface IPropertyFieldListPickerProps{
    label: string;
    initialValue?: string;
    placeHolder?: string;
    context: IWebPartContext,
    environment: EnvironmentType,
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties?: any;
    key?: string;  
    disabled?: boolean;
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    deferredValidationTime?: number;
}

export interface IPropertyFieldGroupListPickerInternal extends IPropertyFieldListPickerProps{
    label: string;
    initialValue?: string;
    placeHolder?: string;
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties: any;
    disabled?: boolean;
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    deferredValidationTime?: number; 
}

class PropertyFieldGroupSortBuilder implements IPropertyPaneField<IPropertyFieldGroupListPickerInternal>{
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyFieldGroupListPickerInternal;

    //Custom properties
    private label: string;
    private initialValue: string;
    private placeHolder: string;
    private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
    private customProperties: any;
    private key: string;
    private context: IWebPartContext;
    private environment: EnvironmentType;
    private disabled: boolean = false;
    private onGetErrorMessage: (value: string) => string | Promise<string>;
    private deferredValidationTime: number = 200;
    private renderWebPart: () => void;
    private disableReactivePropertyChanges: boolean = false;

    public constructor(_targetProperty: string, _properties: IPropertyFieldGroupListPickerInternal){
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialValue = _properties.initialValue;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.context = _properties.context;
        this.environment = _properties.environment;
        if (_properties.disabled === true)
        this.disabled = _properties.disabled;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
        this.deferredValidationTime = _properties.deferredValidationTime;
        this.placeHolder = _properties.placeHolder;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
        this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }

    
    private render(elem: HTMLElement){
        const element: React.ReactElement<IPropertyFieldLinkPickerHostProps> = React.createElement(PropertyFieldLinkPickerHost,{
            label: this.label,
            initialValue: this.initialValue,
            placeHolder: this.placeHolder,
            targetProperty: this.targetProperty,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            context: this.context,
            environment: this.environment,
            disabled: this.disabled,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            render: this.renderWebPart,
            disableReactivePropertyChanges: this.disableReactivePropertyChanges
        });
        ReactDom.render(element,elem);
    }

    private dispose(elem: HTMLElement): void {
    }
}

export function PropertyPaneListPicker(targetProperty: string, properties: IPropertyFieldListPickerProps):IPropertyPaneField<IPropertyFieldGroupListPickerInternal>{
    var newProperties: IPropertyFieldGroupListPickerInternal = {
        label: properties.label,
        targetProperty: targetProperty,
        placeHolder: properties.placeHolder,
        initialValue: properties.initialValue,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        context: properties.context,
        environment: properties.environment,
        disabled: properties.disabled,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    return new PropertyFieldGroupSortBuilder(targetProperty,newProperties);
}