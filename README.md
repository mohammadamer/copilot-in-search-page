# copilot-in-search-page

## Summary

Copilot in Search Page is a SharePoint Framework SPFx extension for integrating a custom Copilot into your SharePoint search page.

![Copilot in SharePoint Search Page](documentation\screenshot-solution-in-action.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Pre-requisites:
- [Azure App registration to set up Microsoft Entra ID authentication for your custom copilot](https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad).
- [Azure App registration to manage and handle the SSO experience effectively within SharePoint](https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso?tabs=webApp#create-app-registrations-for-your-custom-website).
- [A Custom Copilot built in Copilot studio with a knowledge source set to be your SharePoint site](https://www.youtube.com/watch?v=yFCYwIFj3Jg).
- A SharePoint list for holding the copilot configurations. XML PnP list template in the Templates folder in root folder of the app will help you to create the list.

> Add the configuration to the list column as following:
- Title: ConfigList
- BotUrl: The token endpoint for Microsoft Copilot studio. This can be found in the Microsoft Copilot studio designer, under Settings -> Channels -> Mobile App
- CustomScope: The scope defined for the custom API in the copilot app registration. In the first Pre-requisite.
- ClientId: The Azure App registration created for handling SSO. In the second Pre-requisite.
- Authority: The login URL for your tenant. For example: mytenant.onmicrosoft.com
- Greet: Should the copilot greet users at the beginning of the conversation. "true/false"
- BotName: The title for the copilot bot.
- PanelLabel: The Label for copilot dialog chat.


## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| Copilot In Search Page | [Mohammed Amer](https://github.com/mohammadamer) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | August 04, 2024 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome
- Follow the pre-requisites for creating 
    - Azure App regisrations
    - Custom copilot in Copilot studio
    - Configuration list then add a record for the required configurations as mentioned previously
- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **yarn install** or **npm install**
  - **gulp serve**


## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- The extension is integrating a custom Copilot into your SharePoint search page where you ask the copilot questions, the it provide you Generative answers from the current SharePoint site content.


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
