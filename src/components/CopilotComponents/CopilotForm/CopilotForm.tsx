import * as React from "react";
import { override } from "@microsoft/decorators";
import { ICopilotFormProps, ICopilotFormState } from "../CopilotForm/ICopilotForm";
import { FormIds } from "../../../common/constants";
import { Spinner } from "@fluentui/react";
import IMSALWrapperHandler from "../../../extensions/copilotInSearch/Interfaces/IMSALWrapperHandler";
import * as ReactWebChat from 'botframework-webchat';
import { Dispatch } from 'redux'
import { TYPES } from "../../../common/types";
import { myContainer } from "../../../config/inversify.config";
import IDOMHandler from "../../../extensions/copilotInSearch/Interfaces/IDOMHandler";
import styles from "./CopilotForm.module.scss";

export default class CopilotForm extends React.PureComponent<ICopilotFormProps, ICopilotFormState>{
    private _msalWrapperHandler: IMSALWrapperHandler;
    private _domHandler: IDOMHandler;

    public constructor(props: ICopilotFormProps) {
        super(props);

        this.state = {
            submitted: false,
        };

        this._msalWrapperHandler = myContainer.get<IMSALWrapperHandler>(TYPES.IMSALWrapperHandler);
        this._msalWrapperHandler.init(this.props.clientID, this.props.authority);
        this._domHandler = myContainer.get<IDOMHandler>(TYPES.IDOMHandler);
        this.handleLayerDidMount();
    }

    // A utility function that extracts the OAuthCard resource URI from the incoming activity or return undefined
    private getOAuthCardResourceUri(activity: any): string | undefined {
        const attachment = activity?.attachments?.[0];
        if (attachment?.contentType === 'application/vnd.microsoft.card.oauth' && attachment.content.tokenExchangeResource) {
            return attachment.content.tokenExchangeResource.uri;
        }
    }

    private async handleLayerDidMount(): Promise<void> {
        // Trying to get token if user is already signed-in
        let responseToken = await this._msalWrapperHandler.handleLoggedInUser([this.props.customScope], this.props.userEmail);
        if (!responseToken) {
            // Trying to get token if user is not signed-in
            responseToken = await this._msalWrapperHandler.acquireAccessToken([this.props.customScope], this.props.userEmail);
        }

        const token = responseToken?.accessToken ?? null;

        // Your bot's token endpoint
        const botURL = this.props.botURL;
        // constructing URL using regional settings
        const environmentEndPoint = botURL.slice(0, botURL.indexOf('/powervirtualagents'));
        const apiVersion = botURL.slice(botURL.indexOf('api-version')).split('=')[1];
        const regionalChannelSettingsURL = `${environmentEndPoint}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`;

        // Get the regional channel URL
        let regionalChannelURL;

        const regionalResponse = await fetch(regionalChannelSettingsURL);
        if (regionalResponse.ok) {
            const data = await regionalResponse.json();
            regionalChannelURL = data.channelUrlsById.directline;
        }
        else {
            console.error(`HTTP error! Status: ${regionalResponse.status}`);
        }

        // Create DirectLine object
        let directline: any;
        const response = await fetch(botURL);

        if (response.ok) {
            const conversationInfo = await response.json();
            directline = ReactWebChat.createDirectLine({
                token: conversationInfo.token,
                domain: regionalChannelURL + 'v3/directline',
            });
        } else {
            console.error(`HTTP error! Status: ${response.status}`);
        }

        const store = ReactWebChat.createStore(
            {},
            ({ dispatch }: { dispatch: Dispatch }) => (next: any) => (action: any) => {

                // Checking whether we should greet the user
                if (this.props.greet) {
                    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                        console.log("Action:" + action.type);
                        dispatch({
                            meta: {
                                method: "keyboard",
                            },
                            payload: {
                                activity: {
                                    channelData: {
                                        postBack: true,
                                    },
                                    //Web Chat will show the 'Greeting' System Topic message which has a trigger-phrase 'hello'
                                    name: 'startConversation',
                                    type: "event"
                                },
                            },
                            type: "DIRECT_LINE/POST_ACTIVITY",
                        });
                        return next(action);
                    }
                }

                // Checking whether the bot is asking for authentication
                if (action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
                    const activity = action.payload.activity;
                    if (activity.from && activity.from.role === 'bot' &&
                        (this.getOAuthCardResourceUri(activity))) {
                        directline.postActivity({
                            type: 'invoke',
                            name: 'signin/tokenExchange',
                            value: {
                                id: activity.attachments[0].content.tokenExchangeResource.id,
                                connectionName: activity.attachments[0].content.connectionName,
                                token
                            },
                            "from": {
                                id: this.props.userEmail,
                                name: this.props.userFriendlyName,
                                role: "user"
                            }
                        }).subscribe(
                            (id: any) => {
                                if (id === "retry") {
                                    // bot was not able to handle the invoke, so display the oauthCard (manual authentication)
                                    console.log("bot was not able to handle the invoke, so display the oauthCard")
                                    return next(action);
                                }
                            },
                            (error: any) => {
                                // an error occurred to display the oauthCard (manual authentication)
                                console.log("An error occurred so display the oauthCard");
                                return next(action);
                            }
                        )
                        // token exchange was successful, do not show OAuthCard
                        return;
                    }
                } else {
                    return next(action);
                }

                return next(action);
            }
        );

        // hide the upload button - other style options can be added here
        const canvasStyleOptions = {
            hideUploadButton: true
        }

        const webChatRef = this._domHandler.getElement(`#${FormIds.webChatId}`);
        const loadingSpinnerRef = this._domHandler.getElement(`#${FormIds.loadingSpinnerId}`);

        // Render webchat
        if (token && directline) {
            if (webChatRef && loadingSpinnerRef) {
                webChatRef.style.minHeight = '50vh';
                loadingSpinnerRef.style.display = 'none';
                ReactWebChat.renderWebChat(
                    {
                        directLine: directline,
                        store: store,
                        styleOptions: canvasStyleOptions,
                        userID: this.props.userEmail,
                    },
                    webChatRef
                );
            } else {
                console.error("Webchat or loading spinner not found");
            }
        }
    }

    @override
    public render(): JSX.Element {
        return (
            <div id={FormIds.chatContainer} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <main id={FormIds.webChatId} className={styles["apps-copilot-in-search-webChat-custom"]}></main>
                <div id={FormIds.loadingSpinnerId} >
                    <Spinner label="Loading..." style={{ paddingTop: "1rem", paddingBottom: "1rem" }}/></div>
            </div>
        );
    }
}