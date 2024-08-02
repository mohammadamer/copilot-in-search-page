import { injectable } from "inversify";
import IDOMHandler from "../Interfaces/IDOMHandler";
import $ from "jquery";
import { sleep } from "../../../common/utilities";

@injectable()
export default class DOMHandler implements IDOMHandler {
    public removeElement<T extends HTMLElement>(element: T): void {
        element.remove();
    }
    public getElement<T extends HTMLElement>(query: string): T {
        return $(query).get(0) as T;
    }

    public async waitForAnElement<T extends HTMLElement>(query: string): Promise<T> {
        let element = this.getElement(query) as T;
        while (!element) {
            console.log(`SPFx extension Copilot in Search - Waiting for ${query}`);
            await sleep(1000).then(() => { element = this.getElement(query); });
        }
        return Promise.resolve(element);
    }
}