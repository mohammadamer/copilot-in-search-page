export const AppsPrefix: string = "apps-copilot-in-search-";
export const CopilotFormFieldPrefix: string = `${AppsPrefix}-`;
export const Classes = {
    fullWidthContainer: "fullWidthContainer"
};

export const CONSTANTS = {
    fullWidthContainerClassSelector: `[class^=${Classes.fullWidthContainer}]`,

    copilotContainerId: `${AppsPrefix}copilotContainer`,
    CopilotPanelId: `${AppsPrefix}copilotPanel`,
    CopilotConfigListName: `CustomCopilotConfig`
};

export const FormIds = {
    webChatId: `${CopilotFormFieldPrefix}webChat`,
    loadingSpinnerId: `${CopilotFormFieldPrefix}loadingSpinner`,
    chatContainer: `${CopilotFormFieldPrefix}chatContainer`,
};

export const SharePointFields = {
    titleField: `Title`,
    botURLField: `BotUrl`,
    customScopeField: `CustomScope`,
    clientIDField: `ClientId`,
    authorityField: `Authority`,
    greetField: `Greet`,
    botName: `BotName`,
    panelLabel: `PanelLabel`,
    valueField: `Value`
};

export const ErrorMessages = {
    copilotConfigListError: `<p>Something went wrong with the Copilot configuration list. Check the configuration list.</p>`
};

export const Urls = {
    rootSiteUrlPathName: '/_layouts/15/search.aspx',
    authority: 'https://login.microsoftonline.com/'
};