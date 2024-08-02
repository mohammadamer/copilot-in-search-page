import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

export default interface ISharePointHandler {
    init(context?: ApplicationCustomizerContext): void 
    getCopilotConfigrations(): Promise<any>;
    getCurrentUser(): Promise<ISiteUserInfo>;
}