export default interface IMutationHandler {
    addMutationObserver(element: HTMLElement, f: (mutations: MutationRecord[], ...args: any[]) => Promise<void>, config: MutationObserverInit, args: any[]): Promise<void>;
    handleMutationObserverForSearchResultsTypeBar(mutations: MutationRecord[], ...args: any[]): Promise<void>;
}