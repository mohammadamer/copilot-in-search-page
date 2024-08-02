import { inject, injectable } from "inversify";
import { TYPES } from "../../../common/types";
import IMutationHandler from "../Interfaces/IMutationHandler";
import ISharePointPageHandler from "../Interfaces/ISharePointPageHandler";

@injectable()
export default class MutationHandler implements IMutationHandler {
    private _observers = new Map<string, MutationObserver>();
    private _sharePointPageHandler: ISharePointPageHandler;

    public constructor(
        @inject(TYPES.ISharePointPageHandler) sharePointPageHandler: ISharePointPageHandler
    ) {
        this._sharePointPageHandler = sharePointPageHandler;
        this.handleMutationObserverForSearchResultsTypeBar = this.handleMutationObserverForSearchResultsTypeBar.bind(this);
    }

    public async addMutationObserver(element: HTMLElement, f: (mutations: MutationRecord[], ...args: any[]) => Promise<void>, config: MutationObserverInit, args: any[]): Promise<void> {
        if (this._observers.has(element.className)) {
            console.log(`Disconnecting mutation observer for ${element.className}`);
            this._observers.get(element.className)?.disconnect();
            this._observers.delete(element.className);
        }
        this._observers.set(element.className, new MutationObserver((mutations) => f(mutations, args)));
        this._observers.get(element.className)?.observe(element, config);
    }

    public async handleMutationObserverForSearchResultsTypeBar(mutations: MutationRecord[], ...args: any[]): Promise<void> {
        const parentElement: HTMLElement = args[0] as HTMLElement;
        await this._sharePointPageHandler.AddCopilotButton(parentElement);
        return Promise.resolve();
    }
}