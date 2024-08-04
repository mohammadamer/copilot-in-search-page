export interface ICopilotFormProps {
    botURL: string;
    buttonLabel?: string;
    botName?: string;
    panelLabel?: string;
    userEmail: string;
    userFriendlyName: string;
    botAvatarImage?: string;
    botAvatarInitials?: string;
    greet?: boolean;
    customScope: string;
    clientID: string;
    authority: string;
}

export interface ICopilotFormState {
    submitted: boolean;
}