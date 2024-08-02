import { AuthenticationResult } from "@azure/msal-browser";

export default interface IMSALWrapperHandler {
    init(clientId: string, authority: string): void;
    handleLoggedInUser(scopes: string[], userEmail: string): Promise<AuthenticationResult | undefined>;
    acquireAccessToken(scopes: string[], userEmail: string): Promise<AuthenticationResult | undefined>;
}