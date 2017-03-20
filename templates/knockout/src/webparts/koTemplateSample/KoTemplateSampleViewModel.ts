import * as ko from 'knockout';
import styles from './KoTemplateSample.module.scss';
import { IKoTemplateSampleWebPartProps } from './IKoTemplateSampleWebPartProps';

export interface IKoTemplateSampleBindingContext extends IKoTemplateSampleWebPartProps {
  shouter: KnockoutSubscribable<{}>;
}

export default class KoTemplateSampleViewModel {
  public description: KnockoutObservable<string> = ko.observable('');
  public cssClass: KnockoutObservable<string> = ko.observable('');
  public containerClass: KnockoutObservable<string> = ko.observable('');
  public rowClass: KnockoutObservable<string> = ko.observable('');
  public buttonClass: KnockoutObservable<string> = ko.observable('');

  constructor(bindings: IKoTemplateSampleBindingContext) {
    this.description(bindings.description);
    bindings.shouter.subscribe((value: string) => {
      this.description(value);
    }, this, 'description');

    this.cssClass(styles.koTemplateSample);
    this.containerClass(styles.container);
    this.rowClass(`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`);
    this.buttonClass(`ms-Button ${styles.button}`);
  }
}
