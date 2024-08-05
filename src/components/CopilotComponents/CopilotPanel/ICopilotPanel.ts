export interface ICopilotPanelProps {
  isOpen: boolean;
  closePanel: () => void;
  
}

export interface ICopilotPanelState {
}

export interface ICopilotComponentsConfigProperties {
  /**
   * The URL of the bot.
   */
  BotUrl?: string;
  /**
   * The name of the bot.
   */
  BotName?: string;
  /**
   * The label for the button.
   */
  ButtonLabel?: string;
  /**
 * The label for the panel.
 */
  PanelLabel?: string;
  /**
   * The email of the user.
   */
  Email: string;
  /**
 * The email of the user.
 */
  DisplayName: string;
  /**
   * The URL of the bot's avatar image.
   */
  BotAvatarImage?: string;
  /**
   * The initials of the bot's avatar.
   */
  BotAvatarInitials?: string;
  /**
   * Whether or not to greet the user.
   */
  Greet?: boolean;
  /**
   * The custom scope defined in the Azure AD app registration for the bot.
   */
  CustomScope: string;
  /**
   * The client ID from the Azure AD app registration for the bot.
   */
  ClientId: string;
  /**
   * Azure AD tenant login URL
   */
  Authority: string;
}