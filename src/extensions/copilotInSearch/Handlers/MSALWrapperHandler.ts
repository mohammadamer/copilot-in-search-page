import { PublicClientApplication, AuthenticationResult, Configuration, InteractionRequiredAuthError } from "@azure/msal-browser";
import { injectable } from "inversify";
import IMSALWrapperHandler from "../Interfaces/IMSALWrapperHandler";

@injectable()
export default class MSALWrapperHandler implements IMSALWrapperHandler {

    private _msalConfig: Configuration;
    private _msalInstance: PublicClientApplication;

    public init(clientId: string, authority: string) {
        this._msalConfig = {
            auth: {
                clientId: clientId,
                authority: authority,
            },
            cache: {
                cacheLocation: "localStorage",
            },
        };

        this._msalInstance = new PublicClientApplication(this._msalConfig);
    }

    public async handleLoggedInUser(scopes: string[], userEmail: string): Promise<AuthenticationResult | undefined> {
        let userAccount = null;
        const accounts = this._msalInstance.getAllAccounts();

        if (accounts === null || accounts.length === 0) {
            console.log("No users are signed in");
            return undefined;
        } else if (accounts.length > 1) {
            userAccount = this._msalInstance.getAccountByUsername(userEmail);
        } else {
            userAccount = accounts[0];
        }

        if (userAccount !== null) {
            const accessTokenRequest = {
                scopes: scopes,
                account: userAccount
            };

            return this._msalInstance.acquireTokenSilent(accessTokenRequest).then((response) => {
                return response;
            }).catch((errorinternal) => {
                console.log(errorinternal);
                return undefined;
            });
        }
        return undefined;
    }


    public async acquireAccessToken(scopes: string[], userEmail: string): Promise<AuthenticationResult | undefined> {
        const accessTokenRequest = {
            scopes: scopes,
            loginHint: userEmail
        }

        return this._msalInstance.ssoSilent(accessTokenRequest).then((response) => {
            return response
        }).catch((silentError) => {
            console.log(silentError);
            if (silentError instanceof InteractionRequiredAuthError) {
                return this._msalInstance.loginPopup(accessTokenRequest).then((response) => {
                    return response;
                }
                ).catch((error) => {
                    console.log(error);
                    return undefined;
                });
            }
            return undefined;
        })
    }
}