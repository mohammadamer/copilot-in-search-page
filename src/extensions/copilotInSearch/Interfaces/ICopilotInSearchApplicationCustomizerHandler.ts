export default interface ICopilotInSearchApplicationCustomizerHandler {
    onDispose(): void;
    navigatedEventHandler(): Promise<void>;
}