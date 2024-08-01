import { inject, injectable } from "inversify";
import { CONSTANTS, Urls } from "../../../common/constants";
import { TYPES } from "../../../common/types";
import IDOMHandler from "../Interfaces/IDOMHandler";
import ICopilotInSearchApplicationCustomizerHandler from "../Interfaces/ICopilotInSearchApplicationCustomizerHandler";
import IMutationHandler from "../Interfaces/IMutationHandler";
import ISharePointPageHandler from "../Interfaces/ISharePointPageHandler";

@injectable()
export default class CopilotInSearchApplicationCustomizerHandler implements ICopilotInSearchApplicationCustomizerHandler {
    private _domHandler: IDOMHandler;
    private _sharePointPageHandler: ISharePointPageHandler;
    private _mutationHandler: IMutationHandler;

    constructor(
        @inject(TYPES.ISharePointPageHandler) sharePointPageHandler: ISharePointPageHandler,
        @inject(TYPES.IDOMHandler) domHandler: IDOMHandler,
        @inject(TYPES.IMutationHandler) mutationHandler: IMutationHandler
    ) {
        this._domHandler = domHandler;
        this._sharePointPageHandler = sharePointPageHandler;
        this._mutationHandler = mutationHandler;
        this.navigatedEventHandler = this.navigatedEventHandler.bind(this);
    }

    public onDispose(): void {
        const copilotContainer = this._domHandler.getElement(`#${CONSTANTS.copilotContainerId}`);
        this._domHandler.removeElement(copilotContainer);
    }

    public async navigatedEventHandler(): Promise<void> {
        const currentUrl: string = window.location.href;
        const isSearchPage: boolean = currentUrl.toLowerCase().includes(Urls.rootSiteUrlPathName);
        if (isSearchPage) {
            await this.searchPageMainHeader();
        }
        return Promise.resolve();
    }

    public async searchPageMainHeader(): Promise<void> {
        const searchResultsElement: HTMLDivElement = await this._domHandler.waitForAnElement(CONSTANTS.fullWidthContainerClassSelector);
        if (!searchResultsElement) {
            await this.addMutationObserverForSearchResultsTypeBar();
        } else {
            await this._sharePointPageHandler.AddCopilotButton(searchResultsElement);
        }
        return Promise.resolve();
    }

    public async addMutationObserverForSearchResultsTypeBar(): Promise<void> {
        const searchResultsElement: HTMLElement = await this._domHandler.waitForAnElement(CONSTANTS.fullWidthContainerClassSelector);
        const observerConfig: MutationObserverInit = { childList: true };
        this._mutationHandler.addMutationObserver(searchResultsElement, this._mutationHandler.handleMutationObserverForSearchResultsTypeBar, observerConfig, []);
        return Promise.resolve();
    }
}