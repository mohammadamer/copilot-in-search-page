import "reflect-metadata";
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import { override } from '@microsoft/decorators';
import { myContainer } from '../../config/inversify.config';
import { TYPES } from '../../common/types';
import IPnPJsHandler from "./Interfaces/IPnPJsHandler";
import ICopilotInSearchApplicationCustomizerHandler from './Interfaces/ICopilotInSearchApplicationCustomizerHandler';
import { Log } from '@microsoft/sp-core-library';
import * as strings from 'CopilotInSearchApplicationCustomizerStrings';
const LOG_SOURCE: string = 'CopilotInSearchApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CopilotInSearchApplicationCustomizer extends BaseApplicationCustomizer<null> {

  private _copilotInSearchApplicationCustomizerHandler: ICopilotInSearchApplicationCustomizerHandler;
  private _pnPJsHandler: IPnPJsHandler;

  public constructor(
    copilotInSearchApplicationCustomizerHandler = myContainer.get<ICopilotInSearchApplicationCustomizerHandler>(TYPES.ICopilotInSearchApplicationCustomizerHandler),
    pnPJsHandler = myContainer.get<IPnPJsHandler>(TYPES.IPnPJsHandler)
  ) {
    super();
    this._copilotInSearchApplicationCustomizerHandler = copilotInSearchApplicationCustomizerHandler;
    this._pnPJsHandler = pnPJsHandler;
  }

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.application.navigatedEvent.add(this, () => this._copilotInSearchApplicationCustomizerHandler.navigatedEventHandler());
    return super.onInit().then(_ => {this._pnPJsHandler.init(this.context)});
  }

  @override
  public onDispose(): Promise<void> {
    this._copilotInSearchApplicationCustomizerHandler.onDispose();
    return Promise.resolve();
  }
}
