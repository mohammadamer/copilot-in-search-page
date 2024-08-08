import * as React from 'react';
import { ICopilotPanelState, ICopilotPanelProps, ICopilotComponentsConfigProperties } from './ICopilotPanel';
import { Panel, PanelType } from '@fluentui/react';
import { override } from '@microsoft/decorators';
import { CONSTANTS, ErrorMessages, Urls } from '../../../common/constants';
import CopilotForm from '../CopilotForm/CopilotForm';
import * as strings from 'CopilotInSearchApplicationCustomizerStrings';
import { TYPES } from "../../../common/types";
import { myContainer } from "../../../config/inversify.config";
import IPnPJsHandler from '../../../extensions/copilotInSearch/Interfaces/IPnPJsHandler';

export default class CopilotPanel extends React.PureComponent<ICopilotPanelProps, ICopilotPanelState> {
    private _pnPJsHandler: IPnPJsHandler;
    private _copilotConfigrations: any;

    public constructor(props: ICopilotPanelProps) {
        super(props);
        this._pnPJsHandler = myContainer.get<IPnPJsHandler>(TYPES.IPnPJsHandler);
    }

    public async componentDidMount(): Promise<void> {
        try {
            this._copilotConfigrations = await this.getCopilotConfigrations();
        } catch (error) {
            console.error('Error initializing CopilotPanel:', error);
        }
    }

    private async getCopilotConfigrations(): Promise<ICopilotComponentsConfigProperties> {
        const configs: any = await this._pnPJsHandler.getCopilotConfigrations();
        const copilotComponentConfigsProps: ICopilotComponentsConfigProperties = configs;

        const userInfo: any = await this._pnPJsHandler.getCurrentUser();
        copilotComponentConfigsProps.DisplayName = userInfo.Title;
        copilotComponentConfigsProps.Email = userInfo.Email;
        copilotComponentConfigsProps.Authority =`${Urls.authority}${configs.Authority}`

        return Promise.resolve(copilotComponentConfigsProps);
    }

    @override
    public render(): React.ReactElement {
        const onRenderFooterContent =
            () => (
                <div>
                    {this._copilotConfigrations ? (
                        <CopilotForm
                            botURL={this._copilotConfigrations.BotUrl ?? ''}
                            userEmail={this._copilotConfigrations.Email}
                            userFriendlyName={this._copilotConfigrations.DisplayName}
                            customScope={this._copilotConfigrations.CustomScope}
                            clientID={this._copilotConfigrations.ClientId}
                            authority={this._copilotConfigrations.Authority}
                            greet={this._copilotConfigrations.Greet}
                        />
                    ) : (
                        <div>{ErrorMessages.copilotConfigListError}</div>
                    )}
                </div>
            );

        return (
            <Panel
                headerText={this._copilotConfigrations && this._copilotConfigrations.PanelLabel ? this._copilotConfigrations.PanelLabel : strings.CopilotPanelLabel}
                isBlocking={false}
                isOpen={this.props.isOpen}
                onDismiss={() => this.props.closePanel()}
                closeButtonAriaLabel="Close"
                id={CONSTANTS.CopilotPanelId}
                onRenderFooterContent={onRenderFooterContent}
                isFooterAtBottom={true}
                type={PanelType.medium}>
            </Panel>
        );
    }
}