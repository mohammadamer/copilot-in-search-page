import { Logger, LogLevel, PnPLogging } from "@pnp/logging";
import { injectable } from "inversify";
import IPnPJsHandler from "../Interfaces/IPnPJsHandler";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/site-users/web";
import { CONSTANTS, CopilotConfigListKeys, SharePointFields } from "../../../common/constants";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { spfi, SPFx, SPFI } from "@pnp/sp";

@injectable()
export default class PnPJsHandler implements IPnPJsHandler {
    private _context: ApplicationCustomizerContext;
    private _sp: SPFI;

    public init(context: ApplicationCustomizerContext): void {
        Logger.write(`Initializing SharePoint provider `, LogLevel.Verbose);
        this._context = context;
        this._sp = spfi().using(SPFx(this._context)).using(PnPLogging(LogLevel.Warning));
    }

    public async getCopilotConfigrations(): Promise<any> {
        const items = await this._sp.web.lists.getByTitle(CONSTANTS.CopilotConfigListName).items
            .select(
                SharePointFields.titleField,
                SharePointFields.botURLField,
                SharePointFields.customScopeField,
                SharePointFields.clientIDField,
                SharePointFields.authorityField,
                SharePointFields.greetField,
                SharePointFields.botName,
                SharePointFields.panelLabel
            ).filter(`${SharePointFields.titleField} eq '${CopilotConfigListKeys.configList}'`)
            .top(1)
            .getAll();
        return Promise.resolve(items[0]);
    }

    public async getCurrentUser(): Promise<ISiteUserInfo> {
        const currentUser = await this._sp.web.currentUser();
        return Promise.resolve(currentUser);
    }
}   