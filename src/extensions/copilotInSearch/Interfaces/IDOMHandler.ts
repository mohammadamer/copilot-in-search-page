export default interface IDOMHandler {
    getElement<T extends HTMLElement>(query: string): T;
    removeElement<T extends HTMLElement>(element: T): void;
    waitForAnElement<T extends HTMLElement>(query: string): Promise<T>;
}