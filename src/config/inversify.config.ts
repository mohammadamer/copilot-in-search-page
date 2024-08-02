import { Container } from "inversify";
import { TYPES } from "../common/types";
import DOMHandler from "../extensions/copilotInSearch/Handlers/DOMHandler";
import IDOMHandler from "../extensions/copilotInSearch/Interfaces/IDOMHandler";
import IMutationHandler from "../extensions/copilotInSearch/Interfaces/IMutationHandler";
import MutationHandler from "../extensions/copilotInSearch/Handlers/MutationHandler";
import ISharePointPageHandler from "../extensions/copilotInSearch/Interfaces/ISharePointPageHandler";
import SharePointPageHandler from "../extensions/copilotInSearch/Handlers/SharePointPageHandler";
import ICopilotInSearchApplicationCustomizerHandler from "../extensions/copilotInSearch/Interfaces/ICopilotInSearchApplicationCustomizerHandler";
import CopilotInSearchApplicationCustomizerHandler from "../extensions/copilotInSearch/Handlers/CopilotInSearchApplicationCustomizerHandler";
import IMSALWrapperHandler from "../extensions/copilotInSearch/Interfaces/IMSALWrapperHandler";
import MSALWrapperHandler from "../extensions/copilotInSearch/Handlers/MSALWrapperHandler";
import IPnPJsHandler from "../extensions/copilotInSearch/Interfaces/IPnPJsHandler";
import PnPJsHandler from "../extensions/copilotInSearch/Handlers/PnPJsHandler";

const myContainer = new Container();
myContainer.bind<IMutationHandler>(TYPES.IMutationHandler).to(MutationHandler);
myContainer.bind<IDOMHandler>(TYPES.IDOMHandler).to(DOMHandler);
myContainer.bind<ISharePointPageHandler>(TYPES.ISharePointPageHandler).to(SharePointPageHandler);
myContainer.bind<ICopilotInSearchApplicationCustomizerHandler>(TYPES.ICopilotInSearchApplicationCustomizerHandler).to(CopilotInSearchApplicationCustomizerHandler);
myContainer.bind<IMSALWrapperHandler>(TYPES.IMSALWrapperHandler).to(MSALWrapperHandler).inSingletonScope();
myContainer.bind<IPnPJsHandler>(TYPES.IPnPJsHandler).to(PnPJsHandler).inSingletonScope();

export { myContainer };