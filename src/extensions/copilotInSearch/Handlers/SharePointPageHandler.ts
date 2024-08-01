import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { inject, injectable } from "inversify";
import { CONSTANTS } from "../../../common/constants";
import ISharePointPageHandler from "../Interfaces/ISharePointPageHandler";
import CopilotActionButton from '../../../components/CopilotComponents/CopilotActionButton/CopilotActionButton';
import strings from 'CopilotInSearchApplicationCustomizerStrings';
import { TYPES } from '../../../common/types';
import IPnPJsHandler from '../Interfaces/IPnPJsHandler';
import { ICopilotComponentsConfigProperties } from '../../../components/CopilotComponents/CopilotPanel/ICopilotPanel';
import IDOMHandler from '../Interfaces/IDOMHandler';

@injectable()
export default class SharePointPageHandler implements ISharePointPageHandler {
  private _pnpJsHandler: IPnPJsHandler;
  private _domHandler: IDOMHandler;

  constructor(
    @inject(TYPES.IPnPJsHandler) pnpJsHandler: IPnPJsHandler,
    @inject(TYPES.IDOMHandler) domHandler: IDOMHandler
  ) {
    this._pnpJsHandler = pnpJsHandler;
    this._domHandler = domHandler;
  }

  public async AddCopilotButton(element: HTMLElement): Promise<void> {

    const searchMainHeaderContainer: HTMLElement = this._domHandler.getElement(`#${CONSTANTS.copilotContainerId}`);

    //Component is present on the page, no need to add it again.
    if (searchMainHeaderContainer !== undefined && searchMainHeaderContainer !== null) {
      return Promise.resolve();
    } else {
      const copilotDiv: HTMLDivElement = document.createElement("div");
      copilotDiv.id = CONSTANTS.copilotContainerId;

      let buttonStyleClasses = "";

      if (element.firstChild !== null) {
        const childNodesCount = element.firstChild.childNodes.length;
        const rootNodeElement = element.childNodes[0];
        if (rootNodeElement !== undefined && rootNodeElement !== null) {

          //Clone the feedback element classes to the copilot button
          const feedbackElement: HTMLElement = rootNodeElement.childNodes[childNodesCount - 2].firstChild as HTMLElement;
          buttonStyleClasses = feedbackElement.classList.value;

          rootNodeElement.insertBefore(copilotDiv,  rootNodeElement.childNodes[childNodesCount - 1]);
        }
      }

      const configs: ICopilotComponentsConfigProperties = await this._pnpJsHandler.getCopilotConfigrations();
      const botNamevalue = configs.BotName ?? strings.CopilotButtonTitle;
      const props = { botName: botNamevalue, buttonStyleClasses: buttonStyleClasses};
      const copilotActionButton = React.createElement(CopilotActionButton, props);
      ReactDOM.render(copilotActionButton, copilotDiv);
    }
  
    return Promise.resolve();
  }

}