import * as React from 'react';
import { FormEvent } from 'react';

import { IPropertyFieldGroupListPickerInternal } from './PropertyFieldListPicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';

import ListPicker from '../ListPicker/ListPicker';

export interface IPropertyFieldLinkPickerHostProps extends IPropertyFieldGroupListPickerInternal{}
export interface IPropertyFieldLinkPickerState{
    currentValue?: string;
    errorMessage?: string;
}

export default class PropertyFieldLinkPickerHost extends React.Component<IPropertyFieldLinkPickerHostProps, IPropertyFieldLinkPickerState> {
    private latestValidateValue: string;
    private async: Async;
    private delayedValidate: (value: string) => void;

    public constructor(props: IPropertyFieldLinkPickerHostProps){
        super(props);

        this.async = new Async(this);
        this.state = ({ errorMessage: '', currentValue: this.props.initialValue} as IPropertyFieldLinkPickerState);

        this.onValueChanged = this.onValueChanged.bind(this);
        this.validate = this.validate.bind(this);
        this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
        this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
    }

    private onValueChanged(newValue: any): void {
        this.setState({currentValue: newValue});
        this.delayedValidate(newValue);
    }

    private validate(value: string): void {
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValue, value);
            return;
        }

        if (this.latestValidateValue === value) return;
        this.latestValidateValue = value;

        var result: string | PromiseLike<string> = this.props.onGetErrorMessage(value); //.join(',') || '');
        if (result !== undefined) {
        if (typeof result === 'string') {
            if (result === undefined || result === '')
            this.notifyAfterValidate(this.props.initialValue, value);
            this.setState({ errorMessage: result} as IPropertyFieldLinkPickerState);
        }
        else {
            result.then((errorMessage: string) => {
            if (errorMessage === undefined || errorMessage === '')
                this.notifyAfterValidate(this.props.initialValue, value);
            this.setState({ errorMessage } as IPropertyFieldLinkPickerState);
            });
        }
        }
        else {
        this.notifyAfterValidate(this.props.initialValue, value);
        }
    }

    private notifyAfterValidate(oldValue: string, newValue: string) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (!this.props.disableReactivePropertyChanges && this.props.render != null)
            this.props.render();
    }

    public componentWillUnmount() {
        this.async.dispose();
    }

    public render(): JSX.Element {
        return (
            <div>
                <Label>{this.props.label}</Label>
                <ListPicker context={this.props.context} environmentType={this.props.environment}
                            initialListName="Authors"
                            onListSelectionChanged={(newVal) => {
                                this.onValueChanged(newVal);
                            }} />
            </div>
        );
    }
}