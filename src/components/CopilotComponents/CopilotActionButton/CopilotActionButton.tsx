import * as React from 'react';
import { ActionButton } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { override } from '@microsoft/decorators';
import { ICopilotActionButtonProps, ICopilotActionButtonState } from './ICopilotActionButton';
import * as strings from 'CopilotInSearchApplicationCustomizerStrings';
import CopilotPanel from '../CopilotPanel/CopilotPanel';

export default class CopilotActionButton extends React.PureComponent<ICopilotActionButtonProps, ICopilotActionButtonState> {
    public constructor(props: ICopilotActionButtonProps) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    public toggleForm = (): void => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    @override
    public render(): React.ReactElement {
        const CopilotIcon = () => <Icon iconName="ChatBot" />;
        return (
            <>
                <ActionButton className={this.props.buttonStyleClasses} onClick={this.toggleForm} allowDisabledFocus>
                    <CopilotIcon />
                    <span>
                        <span>
                            {this.props.botName ? (this.props.botName) : (strings.CopilotButtonTitle)}
                        </span>
                    </span>
                </ActionButton>
                <CopilotPanel isOpen={this.state.isOpen} closePanel={this.toggleForm} />
            </>
        );
    }
}