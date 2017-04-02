import * as ko from 'knockout';
import styles from './WebPackKo.module.scss';
import { IWebPackKoWebPartProps } from './IWebPackKoWebPartProps';

import { IMessageManager } from './modules/IMessageManager';
import { MessageManager } from './modules/MessageManager';

export interface IWebPackKoBindingContext extends IWebPackKoWebPartProps {
  shouter: KnockoutSubscribable<{}>;
}

export default class WebPackKoViewModel {
  public description: KnockoutObservable<string> = ko.observable('');

  public helloWorldClass: string = styles.helloWorld;
  public containerClass: string = styles.container;
  public rowClass: string = `ms-Grid-row ms-bgColor-redDark ms-fontColor-white ${styles.row}`;

  public message: KnockoutObservable<string> = ko.observable('');

  constructor(bindings: IWebPackKoBindingContext) {
    this.description(bindings.description);

    let mm: IMessageManager = new MessageManager();
    this.message(mm.GetMessage());

    // When web part description is updated, change this view model's description.
    bindings.shouter.subscribe((value: string) => {
      this.description(value);
    }, this, 'description');
  }
}
